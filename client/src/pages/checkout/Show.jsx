import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckBadgeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "lucide-react";

const Show = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(895); // 14:55
  const [quantity, setQuantity] = useState(2);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    mobile: "",
    billingType: "personal",
    firstName: "",
    lastName: "",
    address: "",
    postcode: "",
    city: "",
    country: "Morocco",
    termsAccepted: false,
    emailOptIn: false,
    humanVerified: false,
  });

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

  const allMatchData = {
    "champions-league-1": {
      teamHome: "Tottenham Hotspur",
      teamAway: "Borussia Dortmund",
      competition: "UEFA Champions League",
      date: "Saturday, 20th January 2026 20:45",
      venue: "Tottenham Hotspur Stadium, London, England",
      price: 85,
      section: "BLOCK 1-74 - MILBURN STAND UPPER",
    },
    "premier-league-1": {
      teamHome: "Newcastle United",
      teamAway: "Brentford",
      competition: "ENGLISH PREMIER LEAGUE",
      date: "Saturday, 7th February 2026 17:30",
      venue: "St James Park, Newcastle Upon Tyne, United Kingdom",
      price: 84.72,
      section: "BLOCK L43 - MILBURN STAND UPPER",
    },
    "premier-league-2": {
      teamHome: "Arsenal",
      teamAway: "Chelsea",
      competition: "Premier League",
      date: "Saturday, 22nd February 2026 17:30",
      venue: "Emirates Stadium, London, England",
      price: 92,
      section: "BLOCK 1-74 - MILBURN STAND UPPER",
    },
  };

  const matchData =
    allMatchData[matchId || "premier-league-1"] ||
    allMatchData["premier-league-1"];
  const ticketPrice = matchData.price;
  const serviceFee = 19.42;
  const subtotal = ticketPrice * quantity;
  const total = subtotal + serviceFee;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!formData.email || !formData.confirmEmail || !formData.mobile) {
        alert("Fill all required fields");
        return;
      }
      if (formData.email !== formData.confirmEmail) {
        alert("Emails do not match");
        return;
      }
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else alert("Payment would process here");
  };

  const handleBack = () => navigate(`/match/${matchId}`);

  return (
    <div className="max-w-[1024px] mx-auto px-4 pt-6 pb-15">
      <div className="">
        {/* Timer Bar */}
        <div className="bg-white border border-gray-300 rounded px-6 py-3 mb-8">
          <p className="text-sm text-gray-700">
            The tickets are reserved for you.{" "}
            <span className="font-bold text-black">
              {formatTime(timeRemaining)}
            </span>{" "}
            remaining to finish your order.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-6 mb-10 max-w-xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-black bg-black text-white text-sm mb-1.5">
              1
            </div>
            <span className="text-xs text-gray-700">Your Details</span>
          </div>
          <div className="w-20 h-[2px] bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300 text-gray-400 text-sm mb-1.5">
              2
            </div>
            <span className="text-xs text-gray-500">
              Additional Information
            </span>
          </div>
          <div className="w-20 h-[2px] bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300 text-gray-400 text-sm mb-1.5">
              3
            </div>
            <span className="text-xs text-gray-500">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          {/* LEFT FORM */}
          <div className="rounded-lg ">
            <h2 className="text-xl font-bold mb-5">Your Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  Confirm Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs mb-1.5 text-black">
                Mobile Phone<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>🇲🇦 +212</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Billing Address */}
            <h3 className="text-lg font-bold mb-4">Billing Address</h3>

            <div className="flex gap-6 mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="billingType"
                  value="personal"
                  checked={formData.billingType === "personal"}
                  onChange={(e) =>
                    setFormData({ ...formData, billingType: e.target.value })
                  }
                  className="w-4 h-4 accent-gray-700"
                />
                <span className="text-sm">Personal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="billingType"
                  value="business"
                  checked={formData.billingType === "business"}
                  onChange={(e) =>
                    setFormData({ ...formData, billingType: e.target.value })
                  }
                  className="w-4 h-4 accent-gray-700"
                />
                <span className="text-sm">Business</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs mb-1.5 text-black">
                Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  Postcode<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-black">
                  Town / City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs mb-1.5 text-black">
                Country<span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
              >
                <option value="Morocco">Morocco</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
              </select>
            </div>

            <div className="space-y-3 mb-5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-0.5 w-4 h-4 accent-gray-700"
                />
                <span className="text-xs leading-tight text-black">
                  I have read and agree to the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Terms and Conditions & Privacy Policy
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailOptIn"
                  checked={formData.emailOptIn}
                  onChange={handleInputChange}
                  className="mt-0.5 w-4 h-4 accent-gray-700"
                />
                <span className="text-xs leading-tight text-black">
                  I agree to receive relevant emails with event updates and
                  offers
                </span>
              </label>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white font-medium py-3 rounded transition-colors mb-3"
            >
              Continue
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>100% Money Back Guarantee</span>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUSEhIVFhUVGBUWGBcYFRYVFxUYFxUWFxgXGhUYHSggGBolGxUVITEhJSkrMC4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJ4BQAMBEQACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQADAQIGB//EAEcQAAEDAgMFAwgJAQYEBwAAAAEAAgMEERIhMQUTQVFhBnGBFCIykaGxwfAHIzNCUnKC0eGSFUNTYnPxFiU1shckJjRUk7P/xAAbAQACAwEBAQAAAAAAAAAAAAAAAgEDBAUGB//EADwRAAICAQMBBQUGBgIABwEAAAABAgMRBBIhMQUTIkFRFDJhcYEGI5GhwdEzQlKx4fAVYiQlNGNyksIW/9oADAMBAAIRAxEAPwBJXbOaGFzL5Z63uFkaPpNV8nLEhUlNY82a3BDiPG7v29gTowXeKzBmZu+huNbXHeNR7wjqiIvu7MCNjiCCNRn6khvaysD+sj3kXm6mxHz3J3yjn1y7ufJiGJsLLk955nkEdAlJ2y4FTnGaQZWv7BzSmvCqgX1Wy3DNnnDlx/lTgSGoT4kV020HsyNyOR1HioyNOmM+UGyQRzDEw2d86j4qepSpzqeJdBTNCWmzhYqDXGakso0AUEmQoIM2QBsAoIybAKMhkyGqMkZNgxGSMmcCjIZJgRkDMcJcQ0akgDvOQSymoxbfkLKSim2eo0VKIo2RjRrQPVqfWvC32O2yU35s8pbY7JuT8y6yqEMIAxZAFsNOXdBzUSmkK5YLy9seQFz86lV4lPqRhsqu+Tu9QT+GBPCLo6McTdI7X5EOTL2sA0ACrcmxTZKBEARAEQBCFIFL6Zp4W7k6saJUmgd1M5ubTf3q1Ti+GNuT6m0dXwePnqFDr84kOPoSWlBF2epQrMcSJUvU813AwboO0FjoTbu4L6ael3vdvaEtTTFj8Gt7WPO+iXBujZujkeShgZhcQG2w62TGCLk5ZRpRyRjzIz1tn8ULA1im/FIVbTgwyHk7MfH56pWjXRPdEabLJ3Tb9bd1ymRlvX3jFNdVmR3+UaD496Vs11VqCD9jU9gXnU5Du+fcmSM+onl7TNXVSRvvhuzL5vwUNkQrhOOM8g20Kpj2gtHncyMwPiobLaa5xfPQCilLTdpsfn1qC+UVJYY4ilZO3C7Jw+bhN1McoyqeV0FlRTljrHwPApGaYTU1lFYCgc2DVGSMm4aoyKWNalyRk3DFGSMmwjUZIybbtRuI3E3aMhuHXZOhx1AcRlGMXjo34nwXM7Vv7ujC6vgw9oXbasLqzuMK8pk8/kllIZNSEE5L4Kfi7RVyn5IVy9DM05Pmt/37kRhjlgl6mYaTi71KJWehDl6BQVRBrITY21Uxw3yAF5a7kFf3UR9qLqaoLjY2STgksoiUcBKpFIgDSZ+FpKeEcvALlgflruQVvdRLNiCKWUuuTZJOKj0EawXqogrmhDtdeaeM2gTaA7OjPT2FXeGaH4keZ0lCIiXudz6C3Ur6XjB6my3f4UgKrrAZQ4C4bpwulbLq6moYfmV1laZAAQAAboyPXSoFEUhaQ5pzCgeSTWGbz1Tn2Dje3QD3KRYwjHoERbSIZhwjIWBujJXKhOWQOFgLgCbAnXkgvk8Js6Goa7d2j1sAO7p4Jn0ObHG7xAEW03Nu2RufqPiFGTQ6E+YMWgFxyGZOg68AlNPRcjqk2c1rTiFyRn06D902DFZe5S46C6qp3ROBBNvun54pXwaITVi5GUL2zswuycPYeY6I6meSdMsroLJIi1xadQkfBpUlJZRs1qVsGyxrErZDZc2NK2I2WtiSOQrkWCJRuF3G4hS7iNxNyjcG47PstQ4IMXGQ4vAZD4nxXmO1b9923yRwtfdvsx6DfCuZkxZMFqnIG8MPE6JJS8kDZrM8uNhopilFZYIvhhDe9VynkhvJYkAiAIpIFc7LOIWqLysly6EgdZwKJLKCS4GiyFREACV79B4q+peY0AJWlgzpmWaPX61mseZFTfJakIIgDDm3FipTaA8UZFJMb5kczkB3fwvqPU9o5QrQY3ZrGC8jvbhCnBS75yeIo2bUwtIDW3OmTfiUcEd3a+WyO2qAbYDl1CMkrTt85NodpNe4NwnPLgQjIsqJRWcm1RFDfC4AE5/h9oyU8EQlbjKBptk8WOv0P7qMFsdT/UgaKeSE2N/ynTw/hQWOELEWVlZvQ1rW537z3AobyLXW68tvgOoaMRjE62LieAHJMkZ7bXN4XQ12qyQgYb25DW/ApWNQ4rKkXyRl0P1muG56EcUeRWnts8Imp5SxwcNR82VeTZOKksMc1UIljD26gf7hD5RkhJwltfQXRtVTZobCY40jYjYQyJVuQjkEMhSORW5FrYUrkK5FghS7hdxbT0Ze9rB94gKu21Qg5PyEst2xcn5HdshDQGjQAAeC8fKblJtnnXLc8kLFGQyYDFDeCcklPAKIrzZJtFHbvUSlkDdIBEARAEQAFtBmh8FfU+MDwYIrhxrA67QVlmsMpZukAW1b7uPTJaoLCLIrg0ibdwCZvCJb4GqyFRFAEQBEAeO1W0+EYsBx/YL6nk9hDT+cgbaEJa65JIOYJz8FDLKZJrgoh9Jv5m+8KC2XusY7Wpf7wfq/dMzLp7P5WBUH2rO/4KEaLV4GOa6mxttxGYUtGGqzYxbspxEmHMDO46johdTTek4ZG80LXizhcKWZIyceUJaukdEcQJtwPEd6VrBtrtViwySVL5cLOdhlxPMoyRGuNeWN55hEwakZADjopbwY4xdkuBbWV5eLAWb7T3qts010qPLKIYXONmgk9Eg8pJdRlsebC/CdHewqE+TNqI7llFldS4H3GhzHxCrnwLXZuiWxRqhyJlILjiVbkVOQSyFVuRW5FzYEjkI5FohUbiNw37O0d3l5+6LDvP8AF/WuX2nditQXmYdbb4VH1OhLFwjl5NS1GScmhajGSUzUNRJjIykGIgCIAiAIgCqpZdp9aeDwyV1FpC0lwbQPyI5Km1eZVNchL3WBPJVpZeBRUVqLsBGz2Zk8lXa+MCTDlnEIgCIAiAPCrL6ie8wdHUU4ezCfA8imObCThLIhYwtkAOocPeEpvbzDKOjLU5zFxyKPJt3O3kTcfslNveb636jhMYQV1OBKJBle4PUkZFQXKbcHEJUlLZXK5uQd97Lv6KWTFPqvITVlMYngtOV7tPLoq2bK5qxYZbK585GFugz5AnU38FHUhKNSeQ2l2QBm836DIevijBRPUt+6NYIwBZoAHRQZZSbfIlqSDI4t0v7efrWeeepphNbUsjxzN7AHcRn4jVJJ5RkT2TwUUbeCzSkWyYxjiVTZU2ExxKtyK3IvbGkyJuNxGl3C7jpdlU2CIcz5x8f4svO623vLn8ODkaizfNsLLVlyUZNS1A2TUtUk5K3NUjIrKjA2TUvRtZJqZh1U7GTgwKgKdjJwWg30SNYIIgBXK2ziFqTyslsXwW0hs7vySz5REugRWus23NV1LnIsFyAhXFowpWWb35qibyymTyzaWUN1URi2Qlkr8rHIpu7Y2xk8rHIo7thsZBVN6qHWw2s8e2nS4HXHonToeS+m45Pa0T3rD6jxuiYwPqB11JcteNQRfqL/AAQ0XU2YTiw1BQUVZAbiIvhsQgetNvC8yyNwcARoUCuLi8MF2sfq8ubfehllHvm1BU429Rr+6lMS2rYyjbXoN/N8CokPpveZtSvE0Ra70h8hyjqRNd1PK6ANLOYnm45gjT5zRXXOyW2Cyw1t9NVPe2ySXqPjs5+FrquXydr/AEIw0vnkvphhGYB5uI7ltdVFP8R7pei6f5PL+363WtrRw2R/rl1/Phf3MsqIN82mjopZJHOaxvlMz2EF1gLxRgBozvroj22S4ril9Bn9n1Ot36m9yXV4eV/fAYaRwqzRu2dRbzCXtAfO0SDDi8x4dmbX1/CVPt2ozjJT/wAJ2c9P7RFyxnHy+ZpDJCI2SGKpo2y3Mbg4VMTg3NzjE60mG3EcEr1EJr72tP6Yf5BLsi6qclpNRlx6pv8ALnK/MwIXRYZHFj4XGwniOKK/4XcY3dHLBf2aprfpnn/r5/T1Jr7Vspn3Wthtfr5f4G8TFwZNp4Z19yaygljFU2K2WhqjIuS+kgxva3mc+7iqL7O7rcim2zbBs6YBeaznk5GTBUgcttbtkxsrqelifVVA9JkVsMett5KfMj0PG/RdWjsqcod7fJQh6vq/kupDlh4XLBHUu1Z831MFKCfRhi37wORklIbfuare97Op4jXKfxbwvwQ22x+aRt/w7UW/6pVX54ae39O7+KX/AJHT9PZ4/ixu6l/UzTyHakOcdVDUi/ozw7lxHISRZX72pld2fbxOuUPjF5X4MjbYujyZo+1Ld42CridSTOyaJCDFIeUc481x6GxUW9my2uzTyVkfh1XzRMbecS4Y9c1c00IpcEwyMMeWnJS1kGg5jri4WZrHAgJXMzBV1T4wWQBmOsrGMwirdcju96SCwLBFMbbkBO+EO+EM1lKAetGQVlY0OoIFaWm1kEEwqMgcFUQh7S08fZ1X0o9LCTi8okEgc0EIRE4uLwyVA8x3cfchhBeJA+zKrG2x9Ie0c1CZdfVteV0N9o/ZP7lLEqXjQu2VV2OA6HTof5Spl+pr3coM2uPqj3j3qWUadeMT0s5Y4OHiOYUI12Q3RwMdrPDo2EaE/AqZGXTxam0B0M+B4J00PciuLnJRj1Y2sshVTKybwlydZR0Ekbg+KDe1sjRIxlgW0sZ9GR4OW9cNAdNdcl0LJqlOqrr5v1/weLoitfNarWy21J+GP+/n+AD2K2vgrz5Q43nxRPlJG8Y92TXh+ZBBy8eiwwl4uT0naekU9Ku5Xu8peTXyOjq62IV8E7WPqKiFkjXxwE1LQWgshxSkDzrFxcc8wnbW7Pmcqqu32WdbajCTTzLwv44XPHoVyvqDJRzv2dUROpXWO6aZLw8GWccROoz4OKG3lNoaKpjC2qF0WpLz459fQ27P7RM1RV1UheZwDFDC0ME0EJ1eyKSwJaLZdHc0ReW35hrKVVVVTDG3rKXOJS9G0AbJgqZpJKqDcRxv+qYxzBFHXuFyW7kuIxOAOfPTjYi5J7o8fqW6r2ZVLTXJyfV+exfP0LaOZrQ18YIge7dljjd9JNxhcdSw/dce4qrX6WOrrd0Fia6r1Xr80cWt2dm3rT2PNcvdl8+n0/sOmtXlzstm9lBA12LFq/wHvPwXK7Rs6QMOrn0iNSuSYjh9rbRl2hO+kpXmOCI4amob6WL/AAIj+O3pO+73696imvQ1K+9Zm/dj/wDp/oHMntj9X+g82VsyGmibDBGGMboBx6k6uPU5rl6nVW6ibnY8s0RgorCPJPpZkno9pRVMUjwyQMkDcb8OOIgOBbe1iMHrK9j2D3Wp0brkllZXTyf+sxajMZ5R69FWsdCJwRuywSX4YS3Ff1Lx0tPJXdzjnOPzNqktu48h+i+eat2rLUPkk3bN5LgL3YQ6RxDG4b2yBcf0r2Pbar0uhVcUsvC6enUxUZlZk9d2ls+KojdFNG2RjtWuFx39COYzXjaNRZRNTreGbpRUlhnN0k8mz5mU9Q8yUspwQTuN3RP4QSu4g/df4Hp17K69dW7alixe9Fea9V+qKIt1va+h1T4gVxFJo0pgbgrsliLqM6jxSWeoskW1DbtPrSQeGRF4YvIWgvMtKhkYCKWPO/JVzlxgrmwtUiFNVoFZAmIMWq1MsQVHELDJVSk8lbbyZMI5KN7DLPOl9RPUoR7OqcDrH0T7DzSZN91e6OUOKj0HflPuTMxQXiRz0EpY4OGo9vRIdOcFJYY4q5Q+BzhoQm8jnQi42JCKyTJ0cB8tVjgIPpAtv1F9U3kZFXttz5C8BQXhEYc5haMw3zvgffdAjSUs+o07M07N4+eUXipmGZ44PcDaOP8AU8jwBW7TfdVSufXov1PK9v2S1Opq0EHw8Sl+i/X6Dune5rKqGve+MzuhldUR3eI5HNL2RSAZ2sfR4eorNzhqXn5l8lGUqp6ZJ7U1tfmk8Noto9hwVj4Qw3ggZuWuDdy+tmaHylrR91oF7uOefW4shWrHx0XUz6ntK3Qwlu/iTeVHOdq/c0mFTPs6aWG8DaeV7H08V42iMMYSTbznOaSblxzuTwsu5XXTRZGGM5XU8JqNRqdVGVs5PKfJ1VF2aMW0Y5m4jBPE8OFyAx5YLjI5B2ZHI36LNO9SqcX1TLYUONqkujQWey0c8MkFVIZJInO3c1/r2RuALLu1OVxnkbFZL4xsaaWP3OpoNZdpMpSyvR9Gvic1R7Rq23pW7qaYbqSCR4Y2nbTMYQJ2C4s/Ec+PfhWZqcW4vqd7ZpborUxbUHnKXMnJ+Xy9ACTZzKOSMT1TZm7QxNnDRkGvN2TtdxwyHEHWzzsprm6ZqSZZqYrtPTWVKvaq14fXK8vwGuy3uwFkn2kTnRP6uYbX8RY+K4Pa2mVGoe33Zcr6mLszUO6hbveXD+gYuYdBnSUUWBgHTPvOq85qbO8scjkWS3SbEPbzar4KYMg+3qHtgh6PkNsfc1oc79IWzsrTxtu3We5Fbn9PL6lUnhcdRZPtGj2PTQxSvc1pxAOwOeXvFi97sI9Il1/FaFRqO1Lp2QS4+OMLyRbujUkmCRfSfsxxA37hfiYpAPE4ck8vs9rUs7U/qQtTWBfS5Qtqtl+UREP3Lmytc2zg5jvMdYjhmHfpWjsC2Wn1jpsWMrGH6oTUJShuRzsPaj/0w5uIbwHyPwdn/wDiTn0XTloP/OFPHGN/16f3KlZ9zj6Dj6KKdlFsmSsmu0SF0jjhNxHH5jctTnjP6lh7dlPVa2Omr8uPqyzT4hByY1/8Utmf4z//AKZP2WT/APndb6L8R/aoDhlTR7UpJGMkbLE8YXWycw6glpza4EAi44LG69T2bfGUlhr8GPmNscIr7HbQkfC+Gc3npXmCQ/jwgGOTX77C0990/alEY2q2v3Jrcvh6r6MKZNra+qGbliNaLKUZlJN8CzCFWILntsSFpTyi+LyjWyMkh1K2ze9UTfJTJ5ZakFKKvQKysaHUqanHYUzQKp9So2UAeY0s4e0OHj0K+pZ4PWzg4Swc6qzqLoNKOqxRuadQ026iyZMx21bZqSFKU2F9PKcLmDPENOvyFKZXOCypegOSoGZfQQh78J4g+ClFFrxHJXLEWuLTqPm6GWRaksoYbF9N35fiiJRquIoYTEQ7PeWgXlq2tIOYLII8eEjiMb9Fv1Phqrh8M/ieS7LXtXaeotl5cfgkv3Ltqdro6qnfHPSgSOJka+J5YHTYMAc9h1ysNSsrnlco61PZdmmtVlVnhXDTX8vXCZ6L/ZFPSQUcz3YfIzhLuBM31cmLl57g4nhYrdQ5bXXHz/Q8P2jcrr3qJvz/AL8B0dfDFtB1LhDTUsbODwkf50bhbmWRtPWxT93KVW/0eDNvhG3Z6rJyNV2wc/ZxcxwbUUs0YPAOaHkNdYfdI80jv5ha46RK1J9JIyS1eam11TF9V20ttGOqjvu5YY2Sx+LgRn95rswf3V0dJ9y4S6p8Mplq/vVKPRrDE8DQaMtqGFxoKiMuYciYZX4ZIv62g/qWLtSuOY2Loz0f2U1Fm+zTJ4bTx8H6k7TdsfKsbY6aKNsgDXOIxylrbYQHnJgFtAFyZTz5HstF2R3DjKc22ucdFl/3OkpJi6bGf7+mpZz+fAY3nxLAs3bMd2nqn5ptfqeX0ke6119S6dfzaHWz4sUgHAZnw+QvJ6uzZU2dC+e2DOgXnjlnFbUO+23CwgkU1PJN0D5XCJuX5RIu3T912ZOS6zko/RcsmKzYl6I4/wCnr7Gk/PN/2sXV+yvW36fqJq/I0i+jyhdshtUcbJDStmL94cIfusd8JysTw6q2XbOpWvdCScd2OnOBVTB17ifQs41FFV0ktzDkBfQb1j2vA5aA95S/aLFN9V8fe/YnTeKLieYy0s7ZTQXN9/gwcDKCYwfb7V6aNkHBX/DOfh1MuHnae+9qqJsGxZ4WejHTYB3NaB8F4LQ3O7tONj85ZOhZHbU18Dzv6K+xlLXU8slQx7nMkDRheW5YAeHUr0Xbfad+ksjGrGGvNGaiqM08mnY5nkXaI0tO8viLpIjne7RGX2NtSxw1/wApTdo/+J7L721YlhP6/wCSKvBbhHo5butsusBhqqXEeslPJYH+iS3gvN573s1Z6wn+Uka14bvmh64Lmo2IJjbYKmTyytvLNkpAHWNsQeavreVgsgypmZsnZY3wMQFmZnIoApqRkFZAaHUoCcsLWvPMpWitpEcTzQHB5BQVWB3Q5H919LTPdXV70DFQWLobQek0cyB68j70ET91m1RAWOLT4dRwKGghNTWUbbPP1re/4FShb/cZbtSkwuxD0T7CpaKNPZvWGY2R9qO4qEPqP4YftOlxNxD0m+0JmjPRbteH0Bdiem78vxSofVe6mH7Xb/y9p/DWTA/rijcPY0rfrOYVv/qjyv2f8Ov1MH6t/mv3ObY+xB5EH1ZrCeumsxa9Tvu0O1JMddRhrnsqMNRFbPDkyZxHNpYHacW9SvS6eEHGu3PThnxXVSnGyylrzENXNUSU0NZckU7vJw8ek0stLGSf12B/yjmtSVcZyr9eTJJ2TjGz04Ogpex3/MXU8pO7nhkfG/j91wPLE11rjjlzWaWr+6Uo9U+hpjpPvXGXRoPpuxj5Nmljm4ammmkLeTxdpLb/AIXCxB526qqWrStyujRbDSN1YfVMP+kygijpZ6hpAdUCCMgWs8tkDw7vwtPgAuXdbJ17H5M9P2BQvb42L0efwPILrEfQj0rZos+Bv4aGmB6F7nuA9Sr7W40da/7P+x4Ct7u1L2un+WdbsWKzS7nkO4fPsXgu0bMyUF5FuqnmW0ZLmmU4uE223UA6mkhI7hNKD7wuzNZ7Mh/83/ZEw/ifQ436e/saT88v/axdf7Le9b9P1K9X5HJv7A7QdQCpErHwmJswjEshdgwh48wtw3A4A8Ml2P8Al9ItU6WmpZxnCxn59SjuZ7d3kdx9BtbG6jliawNkjkxPP4w8HCTythLbdOpXC+09U1dCbfDWF8PU0aRrDR0EnYSmO0RtAmTeYg/Bdu7xBuEOthvfIO11XOXbN60vs2FjGM+eC3uI794T2+/6XV/6L1V2P/62v5k3/wANninYzshWVsT30s7I2sdhcHSSMJOEG9mNIORXt+0O0tNpJRjdFtv0SZgrqlNeEb/Rc3yPbDqaoi+tIfEHXvu3AYjbgQ5rbX6jgSsnbWdToO8ql4eH80PR4bMM9P2ub7WogNRDWk9xEIHtXmNNx2fdn+qP6muX8WP1HBK55rQRC647lVJYYklhliQgikCWRkCKAIgCqd1rJ4ImPJS5qcfJu2I6qHJEORvgKXIuTxNfTT6AMtq0tvPGh17+aloy0W58LAYB57fzN94So0T91jnaNLjbl6Q069E7Rgpt2S+AooB9a3v+BSo128wY/ljDmlp0Kc58W4vKFVDCWT4TwB8RzSrqbbZqdWUOExgBIqfDKSNHD23F1CHst3wwHQU5liqaYZukY2eIc5IL42jq6Mn+lbn97pljrF/kzyzn7F2srH7ti/Pp+zG/Zx9NNTVEFFDCyaRm6Zv5A6eTEPrHnIgNAOQbkSOCzRaae1GzWq+q+Fmok3FPL2rheiCOydL/AOdghnLW1VGHRkXuJoHRvwYTxcwutb8J6LTTqHGuVLOP2voI2Wx11Puvr8GdRs7YdMw1VDkWz/X7vTCyQCPzT0fE4jldqvndZLbZ6cZOJCqC3V+vIJWdqYxRQ1jGh26lbG9p9Jt7skaDztmOeSeOnk7HW/NZElqIqtTXk8Gje0p/tTcsJkgqIGPaRmGOwuOPo0iwPLLqpdCVG58NMjv27ti5TRzFMTPLS0jK1sbKQfVzSMD2zzgjEIw4hrmsBwi5vbncLBdYrbW1wj1mi0r0GjbnFzlJcpPmMfLPpkz2q2fTTTR0zaeRlZI9rTIItxE5t7vkwYiHANubjlrwVU0m8LqbNBfqKq5XSmnWk+M5fwQds5wlklmYPNkeGRf6UQEUfrwk+K5nbtyU41eUFz83ycbspNxnfL+Z/kjs4I8LQ3kF89tm5zcmEpbpNlirIOK7SgQbVo6kgBszZKR7r2sX2ki9b2EeK7mj+/0NtPnHE19OGRnEov6HIfTwwmKlsCfPl0F/usXT+yzSdufh+our8jmIfpBrjRtooqZotE2AODJHSFoZguBe2IjourLsfS+0PUzl556rBSrp7dqR3/0S9lpKKme+duGWctODixjQcIP+Y4nG3DJef+0GvhqbYwreVHz+Jp01bisvzO6XnTUIe3o/5ZV/6L10uyONbX8ym73GeL9ju2lTs6J8UVO14e7GS9slwcIbbzSMsl7btDsynWyUpyxj0wYa7ZVrg6f6OthVVVtI7Tq2FgBc8Xbg3j3NLGhrTngaDr0AzzXN7X1lGm0nslLy+nrhfH5llMJSnvZ3Gzvr9r1E2rKaFlK08DI929lt1A3YK4d/3HZ9dfnN7n8lwjRDxWt+g8eFzUzYjalOZS2dCJhKpEIgCIAiAIgCmqGQVkBodSljk7QzQW3RUvqVmVAHh5FjY8Ml9QPoGcrJ0rmgix0KfBys4eUJJKcslaOGJpB5i4SeZ0Iz31t/AepzmsAmpLTNeNCc+hsc1GOTTG3Nbiw9MZgeqc1uF54G1+QKVlsMyzFF11JS2B7UeWhjhqHfBLJmjTwUsphdPUOIZLEcMjHB7Dyc3geh0PMFaNLd3c/F0fD+Rxu2eznqKnBe8uYv/fUJrauSGJ01EWww1DwJiGje00hydEX6tjv5zSPC3Fr63U+Hw+jMnZmoq10UtQm7K1ja/PHw82Na/ZDGF0bmOhpaRm9NXpLNNJhIfFIPTcSAAASBxzw2ra/LzJq1E5YknunN42eSivJryLIK+sjmpJqim8omkjJikjeYpt2BjdHK22B2Tr2I463VkbrIx2PlPkyXdm6G+c7K57HF4eeV9PgK6WKF1NLJHSbQkgeQ94xRCMlhJuHBtyBci4Gl+WWp9pWPDUenn/rMD+zdULO6nfHl9P8AUE0tDUVFqaKMU0MtOZWbrFLvRmWRzVBzDScWWQztbNZbLbbn4mdPT6bQ9nx3wW6SlteeGvikWVb6Orow95bAIcMcsbib02G5Ip4h6T5HC2J19DfQqrMZLng01rU6bUYj4t3Kf9Wf6n6JeQHQ00rGBj3yGolYWNxuJdSUjjckgk4ZJBkG8AeCtU46at6izy91er/3qc3tbULVW+x6ZJLrNrp8f2X4nXbEpQHNDRZrALDlbID55LwnaWok4ylJ+KTL7VGqpVw+R0K88YSKAE/avYorKV8JOFxALHDVj2kOY8dzgD3XHFbdBqnprlZ1XRr1T6kNZWBV2U20aiIslAbUwHd1EfFrx98D8D7Ygf2WjtHSdxPfW/BLmL/T5otqnuWH1Q7XO3P1LcHAds2y1W1aagFRLDE6J8rjE7C5zhjtc8hgHrK9L2W69Pop6nYpS3Y5+hltzKxRyIxt6r/4eleJXmSKcwGUE7wRAtzxa3zDb3vY6rd7Hpv+UjmKw47seWSvfLug36OtpAbSlpYKuWppzAJQ6QuJbICwOtcD8Z+Qqe2qc6RXTgozUscenI1D8e1PKPTl5Lc/U2YQo7T7a8lhu1uOaQ7uCMaySO0H5RqTwA7lu7P0b1NnieIrmT9F/krsntXHUnZvZXklM2InFIS6SV/+JK84nu9eQ6AI12p9puc1xFcRXol0JqhtjhhpWY0osp26lJN+QkmXKsUiAIgCIAiAKangrIDRKU45eyUWAVbiyto3L1GCDyXa1L98fq/dfUWj2Wntx4WM0xmbKKuIEXP3Ti9WahoeubTx6lzSCLg5HNAj4eCivcRG4jUWPtCGWU4c0mZo6gPbfjxHVCIthslgo2v9l4hQx9O/GVbIqrjAdRp1HJCGvqx4kb7aHmt7/gokg0z5ZZABBESfSPDrwCjGBZPvZ4QPsevmjkc6MB4cLSMcMTJGnVr28R7RwWmjUpR7uxZj+a+RyO1uyY2SWo08tlq/B49f3G1RRNqMDIZXsDSHeQzzFrctRBK7zHAjIA2IuVZZpJY3VvdE5ul7ZjVJ16uGyx8bsfn8fp+A/q+0crI6zymmmjkdi8muxzmsD4mxFokAw2AaDlkblUObWcr5FsNDXOVTqsTj/PzjzznArp9pU8sVI7y2SA08BhfFG1+9c4Ai7LAtOLK9/G3COMLnGDVOm6qyxd0pbpZUm1hfPzNdmTVzqGOCNk0W4m3jZnv3MIj1wvc8jFZxvYXy4IjGckoxTI1b0VWoldbKLUo4aXLz6r0Mxbvyh80e7nqnuLjNgw0sDjqY2HOZ99CcuKusVWmW+98+UV1/wcaztHUauC0+jTVa43P0/wB8l+I2oacMublznHE97jdz3HUk/Bec1urnqp7pcLyXkjZpdHDTQ2x6vq/Ns6jZDLMvxdn4cPivLa+e6zavIy6meZ49A7EsODOS6MAS6MAcx2l7PPfI2rpHCOqYMNz6EzNd1KBq3kdQuno9ZGMHRet1b/GL9UGHnK6lOxu1Ecr9xM009ULYoJCAT1jf6Mreo9SjVdmTrXeVPfX/AFL9V5FsLk3h8MU9sNj1groNoUUbJXxRvidE9wZcOxWcCSB983z4DVbOzdVpvZpabUScU3nKEtjLcpRB9mdla2DZD4I5WMqnyOmNrOZ5xAMRLgQQWjla/TNXW9p6WzXRskm4JY+PzFVM1XhdTHYbs5UsrZa2pp4aW8QhZDFhsc2lzzgJAuW8+PTOO1dfRPTx09U3PnLb/sFNclLc1g6HbfaeKB25YDPUu9Gni8554XedI283O9q5ul7MsuXeT8EPOT/T1ZbO1Lhcsq2LsSQSmsrHNfUkFrWt+zpmHVkd9SeLuPdrbqtZDZ7Pp1iHm/OT9WLCPi3S6jkvXP2mkjY79yhySJyEAKlvIpFAEQBEARAEQBRVnIK2pZyNAHDlbgZm91GBcm7HpXEVnnzl9PwemT5QNs+qxsz9Ia/ujBbbDYy2p9B35T7kYEg/Ehdsmr/uz4fsg06iGfEg3aP2Tu74hDRRS/GhPRVOB1+ByPcowbrYb4jLapvFcaEtU4Mmn4swJmOIII1GiXBueGuToQQWte8WIzz4GynBzeVJxiKK2qMjug0Hx70r5NlcFBB2yapjW4TkTxOh8UJGfUQk3nyGdRHibYBp6OFwf2TRnODzF4OfbRTatt0coBh2hVU5syaWIcA17sHg0khXe32fzxT+aOdP7O6OXNUpR+T/AEYYztFWHLyqTwEYPrDbpX2h/wC3H8ymX2diut0vy/YLr4BgDpnPmkNs5HufY8SATYepU3doXuOI4j8hKOxtNGeWnL5vJvQZBcaabeWdXaorCGtN5zg0cSAs1mIRcn5Gex7U2dYywAA0GS8vLMm2ziSeXk3xJcEExI2gTEjaBMSNoC7bGxqeqZgqImyDhcZtPNrhm09QQtGn1Funluqk1/vmS3nhiE9lJ4v/AGm0Z42g5MlaypYByGOzgP1Fbv8AkKrP49EW/VeF/sQlj3ZNFnkG1P8A5lN3+Suv6t6q+87P69zL/wCy/YfM/wCpfgUnsxUS3FVtGd7T9yFrKVpHIlt3EeITvtCirmiiKfrLxP8AYhQcusmONkbGgpW4IImsB1Izc483PN3OPUlc7U62/USzZLP9voi6NcY9EH2Wbcx8GMI5I3MDKgkrmlDQnhByAG8rPRX9wicBEMwd3qidbiQWPcALlIk28IAZ1SeC0Kn1DBvFUXyKSVWOUBc5gOoVSbQGu6byCbfL1DJndjkjewIGDko3MDzZrgRcZ3X1fB6To+Tn4nuieCQRwI5hRg3y22RwO5Xh0biNC0+5TgxR4mkc6CowdHI2fVbyB34gAD6xmgyKGyxChRg15D6dr3xlgGVwQTprmLqcFM5RjLeFR08cIxON3fOgRgpdk7HhdAGpqnSuAAy4N+JUNF8IRrWRhTQNhbicfO5/AKcGedkrXtXQXPYXYpA2zb8OCRo0KSjiLfJZSVz2aG45HT+EollcZDR+02OjOXnaWIuO9Q0ZFS4yM7Ehu7GdG6d/8KvYRqJYWCyrqt5JloMh8SqZrJVGG1BkMllS4CSQ+7ONxPLzo0e0/wAXXJ7TltrUfU5uuntjt9Tow9cHacoyHqNpBnGp2gTGjaBMaNoExo2gYxJJNR6jRi30NBML2UyTS3ImKy8M2ussptmhRwYSjEQBEARAC6rf558Pct9EPAmBc2nGC/G11U7Zb8BkopXeePngrro+BgwjaB80d6o0yy2CK6KMOvfgrL5OOMAzE4s4hNX4o5YuQ1hyHcFiksSZKNkpJEARAHiFPUuZ6J8OB8F9dwevkoy6jGParSLPb6sx6ijBQ6mvdYRFNEWlrXAA3yvbXodEYK5b85ZR/ZkZ0efWCo2lntM/Q2bQxtvd5zFj5wGSNpDvm+iMCSnZpYn+r26IwGbZFM+1icmC3U5n1IwNGleYLBA+VxzvzJOiMFsrI1osjcYJSDn8QeIRtFk1bAazQsla08NQR7QjBljZKtg9dWYfqoxnplw6Dqo2llcc+KRRLs8tjxEi/EfseJSuI6v3SwU0sZe4NH+w5pdpM5qKyxzWTiNgjbqR7OJ7ylcTHBOctzBIH2VbgWsLZMqnApZ2ewmYYW83ecfHT2WXmNfLfc/hwcHWWbrH8BmJFh2GM23iNhBkSI2ATeI2ATeKNgGN4jYBBJndJZTujgeEsMzKz7wVFMsPZIsnH+ZG8Ul+9VXUuDz5D1zyjdUFhEARAEQArrvTPh7gurpl92hHLDDo/sx+X4LBL+L9RhfSO89vzwXQvjiti5GNTFiblqMwufTPZLkZi1shacjY8V0nXGa9ULk13t9Uyrx0BjaH0R3D3Lk2e8xkbqskiAIgDyfZ9ON0A4A4szfrp7F9jwd621uXDFW0IcEhA01Hcfko2miuzdEsqNnOa3FcWy70YIjqE3gFihLjZouUbSyViXUL/sp/+X1/wjBV7VEFmicw2cLFG0sVm5ZQzds9hiu25JFwT67WUbTP38t+GC7KLhICASDkeVlO0suknEN2zBduMat17v4UJFVNuHgB2fWmM2PonXp1CNpdatyyOZHMH1htprz7lG0ypyfhFE9S6Z4AGXAfEo2miOIIZR4YGXObj7Ty7lG0ocnY/gLHSlxJJzKjYXdFhFrZEjgK2G7OZvJGs5nPu1PsWbUPu63Iz32KEHI79sll5Fwy8s803k2Eqjuxcmd6juwyZ3qO7IyTeo7sMk3qjuwyTeo7sMmu+U92SX01VbI6e5Y9TpHJbo9S2ueOGb1LC3zm6e7+FXp7I2Lu59SZxceUW01SHZceX7LNqNLKrnyLIWKSwXrKWkUARSAn2gbSHw9y7ejipVIom+QxlS3dekL4bW43tyWKWms7/p5jqSwL9nuvI0fOi6Grjipip5Yy2hO5gBbzsubo6YWyakPN4KaSqa++8w34XACv1GmnXjus4FjJPqBVjxjOHTLTuW3T1yVa39RXLkdQDzG9w9y4drzN/MuXQ3VRJEAayPDRcmwTwhKbxFEN4PLKmoDMPUgeHH4L7MonVj4slO0KfE+M9bHu1+BQojV24TNNty2YG8z7B/NkKJNL5yWbLjDYweJzPz3IcRbZtywA/wBqvxXyw30tw7+anYXbFgztCuZI2wBuDkTbxQoEVpxeQnY092ln4cx3H+feocRLnzksrK4R+aG52vyCFAWEd3Vm1DVb1hva+hHQ6IcQn4HwJaqLA8t5ad3BMommNmUZhY59mC5tw4Dr0UbcA5qPI2Y1kDbnNx9Z6DkEu3Jnc3Y/gLJ6gvdid/t0TbC6LUVhGoco2BuNg9LsI3HR9k4s3ScvNHecz7LetcbtV+FQXzOT2ldwofU6cSLid2cnJN6juyMmd6juwyTeo7sMk3qO7DJneqO7DJN6juyMmDIjuwyYEqnuychtFtG3muzb7v4XN1fZ+/x19S6u3HDLaqk+/HmNbD3hZ9Pq1/Cv/wB+Y06/5omtLtT7sn9X7hTqezG/FT+H7Ewu8mM2uBFwbjmFx5RcXiSwzQnkylJBa6j3guDZw0PPoVt0mr7l4fKK5wyLP7PlvbD43Fl1/b9Pjr+RR3chjQUWDM5uPqC5Ws1nfeGPul8IY6hM0Qc0tOhWWq2VclKI7WUJ5tmSA5WcO+3sK7lfaNMl4uGZ3XJdC6k2a6932ty1v3qnU9oQ27avxGhW/MarilxEEgtXXsjyJu7kPjyWzTaG27lLC9SudiiL2byd3Jo9Q/crqT7jRRx5/mULdNnmG2Jbvt+Ee/P9l9QjHg7tT4GtJJiY0niErXJRJ4Yp2w+8luQHtz+ITxjwX1PwjLZ7rxN7iPeEklyVTliQheyxI5Gysxwad/AxqdnNZGXXNwOn7JV1Klc28AlDNhkaeZse45JnHgebyhjtmO7A7iDbwKSKKqZ84FUMzm3wm18lZtRc3kIoqQyEknIa8SUrWBZWbRhUTNgaA1uZ+bnmlUclUW5vkTyylxu43KfaXp46Gl0bSdxsCo2kbjIco2kOR2+xo8EDBzGI97s15jWPfdJnntVY52sNxrNsM2TG8R3ZOSbxT3YZM7xR3aDJN4juwyZ3iO7RGSbxHdoMk3iO7QZMF6jYgTJvEbCchVHtB0ZyzHEH4clj1XZ1d654fqPC1xG7qdk7A8AtJ48fHmvPx1FuhsdbeUjW4KxZFMrpKd+EO69D3gru110a6vdKJnzKD4YfR7bDiGuaQTxGnqOi5eq7Gdac4S4+JdC/PVDZcNrBpIgCIIIgkiAIoIBa6ubELkE30tZbdJopamWE0hJz2iSr2vI/IeaOmvrXotP2RTTzLxMyyvk+A2g2QLB0hvfOw08SufrO02m66lj4lldSfLNdobVwkxxjDbK+WXcE+g7MVy7615+AWWuPhR//2Q=="
                alt="Stadium"
                className="w-full h-44 object-cover rounded-t-lg"
              />
            </div>

            <div className="px-5 pb-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1.5">
                {matchData.competition}
              </p>
              <h3 className="text-lg font-bold mb-3">
                {matchData.teamHome} vs {matchData.teamAway}
              </h3>
              <div className="space-y-1.5 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CalendarDaysIcon className="w-4 h-4 " />
                  <span>{matchData.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 " />
                  <span>{matchData.venue}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 "></div>

            <div className=" py-4">
              <div className="space-y-2.5 mb-4 px-5">
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                  <span>150% Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                  <span>Easy and secure payments</span>
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
                        Mobile tickets
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
                        {matchData.section}
                      </p>
                      <p className="text-gray-500">{matchData.teamHome} fans</p>
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
                        Seats: Up To 2 Together
                      </p>
                      <p className="text-gray-500 leading-tight">
                        Max 2 seats will be next to each other. Buying an uneven
                        number means one person will be sitting separately.
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium"
                  >
                    <option value={1}>1×</option>
                    <option value={2}>2×</option>
                    <option value={3}>3×</option>
                    <option value={4}>4×</option>
                  </select>

                  <div className="text-right ">
                    <div className="font-semibold text-sm ">
                      ${subtotal.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-gray-500">Per ticket</div>
                  </div>
                </div>

                <div className="flex items-center justify-between ">
                  <div>
                    <div className="font-semibold text-xs">Total</div>
                    <button className="text-[10px] text-blue-600 underline">
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
