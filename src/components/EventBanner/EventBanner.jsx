import React from "react";
import "./EventBanner.scss";

export default function EventBanner({flyerSource, altText, title, desc, endDate, meetingLink}) {
    let flyer = require(`../../assets/flyers/${flyerSource}`)
    let imageElement;

    if (altText) {
        imageElement = <img src={flyer.default} alt={`${altText}`}/>
    } else {
        imageElement = <img src={flyer.default} alt={`Flyer for ${title} event`}/>
    }


    if (endDate === undefined || new Date().getTime() < endDate.getTime()) {
        return(
            <div className="flyer">
                <div className="container">
                    {imageElement}
                    <div className="text-container">
                        <span className="title">{title}</span>
                        <span className="description">{desc}</span>
                        { meetingLink ? <span className="description">Join here: <a href={meetingLink}>{meetingLink}</a></span> : <></> }
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}