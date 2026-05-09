import ImageSlider from "../../components/banner/ImageSlider"; 
import Footer from "../../components/footer/Footer"; 
import Navbar from "../../components/navbar/Navbar"; 
import style from './Home.module.css'; 
import Product from "../../components/Product/Product"; 
import PageTitle from "../../components/pageTitle/PageTitle"; 
import { useSelector, useDispatch } from "react-redux"; 
import { getProduct } from "../../features/products/productSlice"; 
import { useEffect } from "react"; 
import Loader from "../../components/loader/Loader"; 
import { toast } from "react-toastify"; 
import { removeErrors } from "../../features/products/productSlice";

function Home() {

  const {
    loading,
    products,
    productCount,
    error
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if(error){
      toast.error(error, {
        position: 'top-center',
        autoClose: 3000,
        // theme: 'colored'
      });

      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Opulex" />

          <Navbar />

          <div className={style["home-container"]}>

            <ImageSlider />

            <h2 className={style["home-heading"]}>
              Welcome to OpuLex
            </h2>

            <div className={style["home-product-container"]}>

              {products &&
                products.map((prod) => (
                  <Product
                    key={prod._id}
                    product={prod}
                  />
                ))}

            </div>

          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default Home;