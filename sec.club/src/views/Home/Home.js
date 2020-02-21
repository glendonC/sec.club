import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { ReactSVG } from 'react-svg';
import "./Home.scss";
import "../../assets/logo-hero.scss";
import logo from "../../assets/logo.svg";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle.js";
import EventBanner from "../../components/EventBanner/EventBanner.jsx"
import EVENTS from "./Events.js"
import Footer from "../../components/Footer/Footer.jsx"

export default function HomeView() {
	return (
		<Box>
			<DocumentTitle title="" />
			<Grid container direction="column" justify="center" alignItems="center" className="hero">
				<Grid item>
					<ReactSVG
						className="logo"
						src={logo} />
				</Grid>
				<Grid item>
					<span>Software Engineering Club</span>
				</Grid>
			</Grid>
			<Container className="banners">
				{EVENTS.map((event) => {
					return (
						<EventBanner 
						flyerSource={event.flyerSource}
						title={event.title}
						desc={event.desc}
						endDate={event.endDate}/> 
					)
				})}
			</Container>
			<Footer/>
		</Box>
	)
}