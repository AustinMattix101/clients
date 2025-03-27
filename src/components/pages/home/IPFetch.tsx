import { useEffect } from "react";
import useReactIpLocation from "react-ip-details";
import publicIp from "react-public-ip";

function TimePickerTest(): JSX.Element {
    const {
      currency,
      exchangeRate,
      ipResponse,
      exchangeRateResponse,
      errorMessage,
      geoLocationPosition,
      geoLocationErrorMessage,
      currencyString,
    } = useReactIpLocation({ numberToConvert: 100 });
    console.log(`Full ip response ${ipResponse}`);
    console.log(`Full ip exchange-rate response ${exchangeRateResponse}`);
    return (
      <div>
        {`Local currency string format is ${currencyString}`}
        {`Local currency is ${currency}`}
        {`Geo location details: ${geoLocationPosition}`}
        {`Exchange rate is ${exchangeRate}`}
        {`Error Message: ${errorMessage}`}
        {`Geo Error Message: ${geoLocationErrorMessage}`}
      </div>
    );
  }

const IPFetch: React.FC = () => {
    
      useEffect(() => {
    
        const getIpAddress = async (): Promise<void> => {
          const ipv4 = await publicIp.v4() || "";
          const ipv6 = await publicIp.v6() || "";
          console.log(ipv4);
          console.log(ipv6);
        }
        getIpAddress();
      }, []);

  return (
    <>
    <TimePickerTest />
    </>
  )
}

export default IPFetch;