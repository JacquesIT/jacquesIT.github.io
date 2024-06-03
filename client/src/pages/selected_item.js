import ImagesDisplayer from "../components/selected_item/image_displayer";
import LoginIcon from "../components/login_components/login_icon"
import BikeInfoDisplayer from "../components/selected_item/bike_info_displayer"
import BikeSpecDisplayer from "../components/selected_item/bike_spec_displayer";
import BidDisplayer from "../components/selected_item/bid_displayer";
import BidsFormPopup from "../components/selected_item/bid_input_form";
import styles from "../styling/selected_item.module.scss"
import { useState, useEffect } from 'react';
import { getItems } from "../utils/fetchUtils";

const SelectedItem = () => {
  const [bike, setBike] = useState(null);
  const [spec, setSpec] = useState(null);
  const bikeId = parseInt(window.location.href.split('=').pop());
  sessionStorage.setItem('bikeId', bikeId)

  useEffect(() => {
    const fetchBikes = async () => {
      const data = await getItems('bike', bikeId, '');
      setBike(data);
    };

    const fetchSpecs = async () => {
      const data = await getItems('bike', bikeId, 'spec');
      setSpec(data);
    };

    fetchBikes();
    fetchSpecs();
  }, [bikeId]);

  return (
    <div className={styles.selectedItemContainer}>
      <ul>
        <LoginIcon />
      </ul>
      <div className={styles.selectedItemForm}>
        <ImagesDisplayer bikeId={bikeId}/>
        {bike && (
          <BikeInfoDisplayer 
            bike_name={bike.bike_name} 
            brand={bike.brand} 
            model_year={bike.model_year} 
            original_price={bike.original_price} 
            type={bike.type} 
            start_date={bike.start_date} 
            end_date={bike.end_date} 
          />
        )}
        {spec && (
          <BikeSpecDisplayer 
            frame={spec.frame} 
            fork={spec.fork} 
            front_derailluer={spec.front_derailluer} 
            rear_deraileur={spec.rear_deraileur} 
            shifters={spec.shifters} 
            crankset={spec.crankset} 
            chain={spec.chain} 
            breaks={spec.breaks} 
            wheels={spec.wheels} 
            tyres={spec.tyres} 
            stem={spec.stem} 
            handlebar={spec.handlebar} 
            pedals={spec.pedals} 
          />
        )}
        <BidDisplayer bikeId={bikeId} />
        <BidsFormPopup />
      </div>
    </div>
  );
}

export default SelectedItem;
