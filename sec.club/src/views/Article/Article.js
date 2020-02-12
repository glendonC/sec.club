import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import "./Article.scss";
import Markdown from "react-markdown";
import HtmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "../../components/CodeBlock/CodeBlock.js";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle.js";

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const parseHtml = HtmlParser({
	isValidNode: node => node.type !== 'script',
});

export default class ArticleView extends PureComponent {
	static propTypes = {
		source: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}

	constructor(props) {
		super();
		this.state = { markdown: "" };
	}

	fetchArticle() {
		let url = require(`../../articles/${this.props.source}`);

		fetch(url).then(resp => {
			return resp.text();
		}).then(text => {
			this.setState({
				markdown: text,
			});
		});
	}

	componentDidMount() {
		this.fetchArticle();
	}

	componentDidUpdate() {
		this.fetchArticle();
	}

	render() {
		const { title } = this.props;
		const { markdown } = this.state;

		return (
			<Container>
				<DocumentTitle title={title} />
				<article>
					<Markdown
						source={markdown}
						escapeHtml={false}
						astPlugins={[parseHtml]}
						renderers={{ code: CodeBlock }}
						transformImageUri={uri => require(`../../assets/${uri}`).default}
					/>
				</article>
			</Container>
		);
	}
}