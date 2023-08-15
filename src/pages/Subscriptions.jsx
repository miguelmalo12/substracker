import { useState } from 'react';

import NavbarApp from "../components/NavbarApp";
import DropdownFilter from "../components/DropdownFilter";
import ButtonSmall from "../components/ButtonSmall";
import NoSubs from "../components/NoSubs";

function Subscriptions() {
    const [selectedInterval, setSelectedInterval] = useState('Monthly');
    const [selectedMetric, setSelectedMetric] = useState('Average');
  
    return (
    <div className="responsive-padding">
        <NavbarApp content={'Subscriptions'} />
        <div className="flex gap-2.5">
            <DropdownFilter options={['Monthly', 'Yearly', 'Weekly']} 
            onChange={setSelectedInterval} />
            <DropdownFilter options={['Average', 'Total']} onChange={setSelectedMetric}/>
            <ButtonSmall content={"+ Add"} type={"primary"} />
        </div>
        <div className="flex flex-col items-center">
            <h1 className="py-2 text-4xl">0.00 $</h1>
            <h4 className="text-medium-grey">{selectedInterval} {selectedMetric}</h4>
        </div>
        <div className="mt-6 mb-6 border"></div>
        {/* <NoSubs /> */}
    </div>
  )
}

export default Subscriptions