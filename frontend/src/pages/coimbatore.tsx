import { Helmet } from "react-helmet-async";
import { CityPage } from "@/components/site/CityPage";


export default function Coimbatore() {
  return (
    <>

      <Helmet>
        <title>Tempo Traveller & Vehicle Rental in Coimbatore — Right Choice</title>
        <meta name="description" content="Right Choice Coimbatore — Urbania, Tempo Traveller & Innova rentals. Outstation & local tariffs, fixed tour packages. 26 years experience." />
      </Helmet>
      <CityPage city="Coimbatore" />
    </>
  );
}

