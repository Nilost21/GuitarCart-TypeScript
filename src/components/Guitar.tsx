const Guitar = ({ guitar, addToCart }) => {
  const { id, name, description, image, price } = guitar;

  // const handleClick = (guitar) => {
  //   setCart([...cart, guitar]); //Toma una copia de lo que tiene el carrito y le agrega un nuevo elemento
  // };

  return (
    <>
      <div key={id} className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img
            className="img-fluid"
            src={`/img/${image}.jpg`}
            alt="imagen guitarra"
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={() => addToCart(guitar)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </>
  );
};



export default Guitar;
