import style from "./Loader.module.css";

function Loader(){
  return(
    <div className = {style["loader-container"]}>
      <div className={style["loader"]}></div>
    </div>
  )
}

export default Loader;