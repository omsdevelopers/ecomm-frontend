import React from 'react'
import Layout from "../src/layout/Layout";
import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
const ShippingPolicy = () => {
    return (
        <Layout footer={3}>
            <PageBanner pageName={"Shipping Policy"} />

            <section>
                <div className='container' style={{marginTop:'100px'}}>
                    <h1>SHIPPING</h1>
                    <h4>Domestic Shipping</h4>
                    <h6>Hi-fi aims to deliver products within India and states all over India at its own cost, guaranteeing processing
                        within 4-8 days. Shipping will be done through a reputed domestic courier company. We will send you the Airway
                        number / docket number or any courier details through email after the products are shipped. Octroi or entry tax,
                        if any, should be borne by the customer.</h6>
                        <h4>International Shipping</h4>
                        <h6>All international orders (outside India) will be processed within 6-12 days and shipped through a reputed International Courier company viz. DHL. Please note that all international shipping will constitute a flat shipping rate based on your location. We will send you the Shipper’s reference number (airway bill / docket number) along with the courier company details through email.
We are not responsible for any delay caused by unforeseen time lags by the courier companies in delivering the goods to the customer, or if the customer is not available at the time of delivery. Customs or duties applicable for the ordered items will be billed separately to the customer by the courier company at the time of delivery. Duties and taxes are not a part of the customer’s payment made to us.</h6>
<h4>Area Surcharge & Custom Clearance for International Orders</h4>
<ul className=""  style={{ listStyleType: 'bullet' }}>
      <li  style={{ listStyle: 'block' }}>Fuel Surcharge & Goods and Services Tax will be charged, as applicable</li>
      <li  style={{ listStyle: 'block' }}>Clearance Charge of Rs. 1800 will be applicable on all Formal Clearance shipments</li>
      <li  style={{ listStyle: 'block' }}>Remote Area Fee of Rs. 24 per kg with a minimum of Rs. 1950 will be charged for all remote area locations</li>
      <li  style={{ listStyle: 'block' }}>Oversize Piece Surcharge of Rs. 6000 per shipment is applicable if a single piece weighs {'>'}70 kg or piece dimension {'>'}120 cms</li>
      <li  style={{ listStyle: 'block' }}>Non-Stackable Pallet Surcharge of Rs. 11000 is applicable for shipments that are non-stackable in nature due to its packaging</li>
      <li  style={{ listStyle: 'block' }}>Address Correction charges of Rs. 850 will be levied when the delivery address is found to be incorrect, and DHL initiates an additional process to locate the correct address to complete the delivery</li>
      <li  style={{ listStyle: 'block' }}>Express 12:00 Surcharge of Rs. 800; Express 9:00 Surcharge of Rs. 1200 per shipment are applicable over Express Worldwide rates</li>
      <li  style={{ listStyle: 'block' }}>Duties and Taxes Paid (DTP) surcharge of Rs. 2200 will be charged</li>
      <li  style={{ listStyle: 'block' }}>Elevated Risk surcharge of Rs. 1650 will apply when shipping to a destination country (Afghanistan, Burundi, Iraq, Libya, Mali, Niger, South Sudan, Yemen) where DHL is operating at an elevated risk due to continuous state of war, civil unrest, or continuous threats from terrorism</li>
      <li  style={{ listStyle: 'block' }}>Restricted Destination surcharge of Rs. 2500 apply for Non-Document shipments when shipping to a destination country (Yemen, Central African Republic, Libya, Iran, D.P.R North Korea, Iraq, Somalia, Eritrea, Liberia, Democratic Republic of Congo, Cote d’Ivoire, Sudan, Syria) that is subject to trade restrictions imposed by the UN Security Council</li>
      <li  style={{ listStyle: 'block' }}>Data Entry charge of Rs. 225 per shipment will be applicable for manual AWB preparation</li>
      <li  style={{ listStyle: 'block' }}>Any individual piece or shipment above 1000 kg and/or with Odd dimensions (Length {'>'}300 cms and/or Width {'>'}120 cms and/or Height {'>'}160 cms) require pre-approval from DHL and may be charged at alternative rates. Please contact your DHL Account Manager for details</li>
      <li  style={{ listStyle: 'block' }}>Any other levies, taxes or duties enforced by the government would be charged as applicable</li>
    </ul>
                </div>
            </section>



        </Layout>
    );
};
export default ShippingPolicy;