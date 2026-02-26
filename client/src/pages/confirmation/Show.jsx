const Show = () => {
  return (
    <section className="max-w-[1024px] mx-auto px-4 py-10">
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h1 className="text-2xl font-bold text-green-700">Reservation confirmed</h1>
        <p className="mt-2 text-sm text-green-800">
          Your payment was successful and your reservation has been created.
        </p>
      </div>
    </section>
  );
};

export default Show;
