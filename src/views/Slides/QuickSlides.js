import React from "react";
import yaml from "js-yaml";
import { Slide, SlideDeck } from "../../components/SlideDeck/SlideDeck.js";
import SecMarkdown from "../../components/SecMarkdown/SecMarkdown.js";
import "./QuickSlides.scss";

export default class QuickSlides extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			data: {
				slides: [],
			},
		};
	}

	componentDidMount() {
		const src = require(`../../slides/${this.props.slidePath}`);
		fetch(src)
			.then(res => {
				return res.text();
			})
			.then(content => {
				let data = yaml.load(content);
				this.setState({
					data: data,
				});
			});
	}

	render() {
		let data = this.state.data;
		if (!data) {
			return null;
		}
		let slides = [];
		for (const [i, slide] of data.slides.entries()) {
			let content = "";
			switch (slide.type) {
				case "title":
					content = (
						<div>
							<h1>{slide.title ?? "Untitled presentation"}</h1>
							<h2>{slide.subtitle ?? ""}</h2>
						</div>
					);
					break;
				case "side-by-side":
					content = (
						<div className="side-by-side">
							<div className="left-content">
								<SecMarkdown markdown={slide.content.left} />
							</div>
							<div className="right-content">
								<SecMarkdown markdown={slide.content.right} />
							</div>
						</div>
					);
					break;
				default:
					content = <SecMarkdown markdown={slide.content} />;
					break;
			}
			let slideProps = {};
			if (slide.sticky) {
				slideProps.sticky = true;
				if (slide.sticky !== true) {
					slideProps.stickyUntil = slide.sticky;
				}
			}
			slides.push(
				<Slide key={i} {...slideProps}>
					{content}
				</Slide>
			);
		}
		return <SlideDeck>{slides}</SlideDeck>;
	}
}
