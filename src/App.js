import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, fetchAnother, removeFav } from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, NavLink } from "react-router-dom";

export default function App() {


  const dispatch = useDispatch();
  const { dogfact, loading, favs } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchAnother());
  }, [dispatch]);

  const handleFetchAnother = () => {
    dispatch(fetchAnother());
  };

  const handleAddToFavorites = () => {
    if (dogfact) {
      dispatch(addFav(dogfact));
      toast.success("Dog added to favorites!");
    }
  };

  const handleRemoveFromFavorites = (factId) => {
    dispatch(removeFav(factId));
    toast.info("Dog removed from favorites!");
  };

  
  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button onClick={handleFetchAnother}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={handleAddToFavorites}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? favs.map((item) => (
                <FavItem key={item.key} id={item.key} title={item.activity} />
              ))
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            }
          </div>
        </Route>
      </Switch>
    </div>
  );
}
