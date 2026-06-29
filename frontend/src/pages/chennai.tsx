import { Helmet } from "react-helmet-async";
import { CityPage } from "@/components/site/CityPage";


export default function Chennai() {
  return (
    <>

      <Helmet>
        <title>Tempo Traveller & Vehicle Rental in Chennai — Right Choice</title>
        <meta name="description" content="Right Choice Chennai — Urbania, Tempo Traveller & Innova rentals. Outstation & local tariffs, fixed tour packages. 26 years experience." />
      </Helmet>
      <CityPage city="Chennai" />
    </>
  );
}

