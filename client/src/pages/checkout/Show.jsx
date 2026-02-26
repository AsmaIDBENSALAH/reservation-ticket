import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckBadgeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import keycloak from "@/keycloak";
import PageReload from "@/components/ui/PageReload";
import { useTranslation } from "react-i18next";
import {
  clearSelectedMatch,
  fetchMatchById,
  fetchStadiumById,
  fetchTeamById,
  selectAwayTeam,
  selectHomeTeam,
  selectMatchesLoading,
  selectSelectedMatch,
  selectStadium,
} from "@/store/slices/matchesSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutPaymentContent = ({
  firstName,
  lastName,
  email,
  t,
  reservationPayload,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsPaying(true);
    setPaymentError("");

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card input is not ready yet.");
      }

      const { token, error } = await stripe.createToken(cardElement);
      if (!token?.id || error) {
        throw new Error(error?.message || "Unable to create Stripe token.");
      }

      if (
        !reservationPayload?.matchId ||
        !reservationPayload?.matchZonePricingId ||
        !reservationPayload?.quantity
      ) {
        throw new Error("Missing reservation data. Please go back and select tickets.");
      }

      const response = await fetch("http://localhost:8084/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({
          matchId: reservationPayload.matchId,
          matchZonePricingId: reservationPayload.matchZonePricingId,
          quantity: reservationPayload.quantity,
          stripeToken: token.id,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || `Payment failed with status ${response.status}`,
        );
      }

      navigate("/confirmation", { replace: true });
    } catch (error) {
      setPaymentError(error?.message || "Payment failed.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="rounded-lg ">
      <h2 className="text-xl font-bold mb-5">{t("checkout.yourDetails")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs mb-1.5 text-black">First Name</label>
          <input
            type="text"
            value={firstName || ""}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs mb-1.5 text-black">Last Name</label>
          <input
            type="text"
            value={lastName || ""}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs mb-1.5 text-black">Email Address</label>
        <input
          type="email"
          value={email || ""}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
        />
      </div>

      <h3 className="text-lg font-bold mb-4">{t("checkout.payment")}</h3>
      <div className="mb-5">
        <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm">
          <CardElement />
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isPaying || !stripe}
        className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white font-medium py-3 rounded transition-colors mb-3 disabled:opacity-70"
      >
        {isPaying ? "Processing..." : t("checkout.payNow")}
      </button>

      {paymentError ? (
        <div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {paymentError}
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span>{t("checkout.guarantee")}</span>
      </div>
    </div>
  );
};

const Show = () => {
  const { id: matchId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState(895); // 14:55
  const checkoutState = location.state || {};
  const stateMatch = checkoutState?.match;
  const stateCategory = checkoutState?.category;
  const initialQuantity = Number(checkoutState?.quantity || 1);
  const [quantity, setQuantity] = useState(initialQuantity > 0 ? initialQuantity : 1);
  const match = useSelector(selectSelectedMatch);
  const homeTeam = useSelector(selectHomeTeam);
  const awayTeam = useSelector(selectAwayTeam);
  const stadium = useSelector(selectStadium);
  const loading = useSelector(selectMatchesLoading);
  const userFirstName = keycloak?.tokenParsed?.given_name;
  const userLastName = keycloak?.tokenParsed?.family_name;
  const userEmail = keycloak?.tokenParsed?.email;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const formatMatchDate = (dateTime) => {
    if (!dateTime) return "";
    return new Date(dateTime).toLocaleDateString(i18n?.language === "ar" ? "ar" : i18n?.language || "fr", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!keycloak?.authenticated) {
      keycloak.login();
    }
  }, []);

  useEffect(() => {
    if (stateMatch) return;
    if (matchId) {
      dispatch(clearSelectedMatch());
      dispatch(fetchMatchById(matchId));
    }
  }, [dispatch, matchId, stateMatch]);

  useEffect(() => {
    if (stateMatch) return;

    if (match?.homeTeam?.id) {
      dispatch(fetchTeamById({ id: match?.homeTeam?.id, role: "home" }));
    }
    if (match?.awayTeam?.id) {
      dispatch(fetchTeamById({ id: match?.awayTeam?.id, role: "away" }));
    }
    if (match?.stadium?.id) {
      dispatch(fetchStadiumById(match?.stadium?.id));
    }
  }, [dispatch, match, stateMatch]);

  const selectedMatch = stateMatch || match;
  const selectedHomeTeam = stateMatch?.homeTeam || homeTeam;
  const selectedAwayTeam = stateMatch?.awayTeam || awayTeam;
  const selectedStadium = stateMatch?.stadium || stadium;

  const availableSeats = Number(
    stateCategory?.availableSeats || match?.zonePricings?.[0]?.availableSeats || 0,
  );
  const maxQuantity = Math.max(1, Math.min(10, availableSeats || 10));
  const ticketPrice = Number(stateCategory?.price || match?.zonePricings?.[0]?.price || 0);
  const stateTotal = Number(checkoutState?.total);
  const initialFeeFromState = Number.isFinite(stateTotal)
    ? Math.max(0, stateTotal - ticketPrice * (initialQuantity > 0 ? initialQuantity : 1))
    : 19.42;
  const serviceFee = stateMatch ? initialFeeFromState : 19.42;
  const subtotal = ticketPrice * quantity;
  const total = subtotal + serviceFee;
  const matchBanner =
    selectedMatch?.matchImageUrl ||
    selectedStadium?.imageUrl ||
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80";
  const stadiumText = useMemo(
    () => `${selectedStadium?.name || ""}, ${selectedStadium?.cityName || ""}`,
    [selectedStadium],
  );
  const reservationPayload = useMemo(
    () => ({
      matchId: checkoutState?.matchId || stateMatch?.id,
      matchZonePricingId: checkoutState?.matchZonePricingId || stateCategory?.matchZonePricingId,
      quantity: checkoutState?.quantity || quantity,
      total,
    }),
    [
      checkoutState?.matchId,
      stateMatch?.id,
      checkoutState?.matchZonePricingId,
      stateCategory?.matchZonePricingId,
      checkoutState?.quantity,
      quantity,
      total,
    ],
  );

  if (!location.state) {
    return <Navigate to="/matches" replace />;
  }

  if (
    !stateMatch &&
    (loading?.selected || loading?.homeTeam || loading?.awayTeam || loading?.stadium) &&
    (!match || !homeTeam || !awayTeam || !stadium)
  ) {
    return <PageReload message="Reloading checkout data..." />;
  }

  return (
    <div className="max-w-[1024px] mx-auto px-4 pt-6 pb-15">
      <div className="">
        {/* Timer Bar */}
        <div className="bg-white border border-gray-300 rounded px-6 py-3 mb-8">
          <p className="text-sm text-gray-700">
            {t("checkout.reserved")}{" "}
            <span className="font-bold text-black">
              {formatTime(timeRemaining)}
            </span>{" "}
            {t("checkout.remaining")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          <Elements stripe={stripePromise}>
            <CheckoutPaymentContent
              firstName={userFirstName}
              lastName={userLastName}
              email={userEmail}
              t={t}
              reservationPayload={reservationPayload}
            />
          </Elements>

          {/* RIGHT SUMMARY */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <img
                src={matchBanner}
                alt={`${selectedHomeTeam?.name || "Match"} vs ${selectedAwayTeam?.name || "Team"}`}
                className="block w-full h-44 object-cover object-center rounded-t-lg"
              />
            </div>

            <div className="px-5 pb-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1.5">
                {selectedMatch?.matchNumber}
              </p>
              <h3 className="text-lg font-bold mb-3">
                {selectedHomeTeam?.name} vs {selectedAwayTeam?.name}
              </h3>
              <div className="space-y-1.5 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CalendarDaysIcon className="w-4 h-4 " />
                  <span>{formatMatchDate(selectedMatch?.dateTime)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 " />
                  <span>{stadiumText}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>
                    Category: {stateCategory?.name || "N/A"} ({ticketPrice.toFixed(2)} per
                    ticket)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 "></div>

            <div className=" py-4">
              <div className="space-y-2.5 mb-4 px-5">
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                  <span>{t("checkout.guarantee")}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                  <span>{t("checkout.easySecure")}</span>
                </div>
              </div>
              {/* Payment Methods */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4 px-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-5"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-5"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                  alt="Amex"
                  className="h-4"
                />
                <span className="px-2 py-0.5 border border-gray-300 rounded text-[10px]">
                  klarna
                </span>
                <span className="px-2 py-0.5 border border-gray-300 rounded text-[10px]">
                  🍎 Pay
                </span>
                <span className="px-2 py-0.5 border border-gray-300 rounded text-[10px]">
                  G Pay
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300  my-4"></div>

              {/* Ticket Details with Barcode */}
              <div className="flex gap-3 px-5">
                <div className="flex-1 space-y-2.5 text-[10px]">
                  <div className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-gray-700">
                        {t("checkout.mobileTickets")}
                      </p>
                      <p className="text-gray-500 leading-tight">
                        Can be opened on a phone and will be sent digitally,
                        always in time for the event.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"></path>
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-gray-700">
                        {selectedStadium?.name}
                      </p>
                      <p className="text-gray-500">{selectedStadium?.cityName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-gray-700">
                        Quantity selected: {quantity}
                      </p>
                      <p className="text-gray-500 leading-tight">
                        Subtotal: ${subtotal.toFixed(2)} | Total: ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-700">
                        iPhone Users Only, Adult + Junior (Under 18yrs)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-medium text-gray-700">
                      Unrestricted view
                    </span>
                  </div>
                </div>

                {/* Barcode */}
                <div className="flex-shrink-0 w-[30px] flex items-center justify-center">
                  <svg
                    width="30"
                    height="147"
                    viewBox="0 0 30 147"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <rect width="30" height="4.82143" fill="#BBBBBB"></rect>
                    <rect
                      y="20.8928"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="28.9285"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="54.6428"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="46.6072"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="59.4644"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="73.9285"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="91.6072"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="98.0356"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="110.893"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="67.5"
                      width="30"
                      height="3.21429"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="141.428"
                      width="30"
                      height="4.82143"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="81.9644"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="106.072"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="86.7856"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="131.786"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="36.9644"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="136.607"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect
                      y="41.7856"
                      width="30"
                      height="1.60714"
                      fill="#BBBBBB"
                    ></rect>
                    <rect y="13" width="30" height="5" fill="#BBBBBB"></rect>
                    <rect y="8" width="30" height="2" fill="#BBBBBB"></rect>
                    <rect
                      y="118.928"
                      width="30"
                      height="9.64286"
                      fill="#BBBBBB"
                    ></rect>
                  </svg>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-300  my-4"></div>

              <div className="space-y-3 px-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <select
                    value={Math.min(quantity, maxQuantity)}
                    onChange={(e) =>
                      setQuantity(Math.min(Number(e.target.value), maxQuantity))
                    }
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium"
                  >
                    {Array.from({ length: maxQuantity }, (_, index) => index + 1).map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}×
                        </option>
                      ),
                    )}
                  </select>

                  <div className="text-right ">
                    <div className="font-semibold text-sm ">
                      ${subtotal.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      ${ticketPrice.toFixed(2)} per ticket
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between ">
                  <div>
                    <div className="font-semibold text-xs">Total</div>
                    <button type="button" className="text-[10px] text-blue-600 underline">
                      Voucher code?
                    </button>
                  </div>
                  <div className="text-xl font-bold">${total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
