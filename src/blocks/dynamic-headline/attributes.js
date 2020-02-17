export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: 'p,h1,h2,h3,h4,h5,h6',
	},
	element: {
		type: 'string',
		default: generateBlocksDefaults.headline.element,
	},
	dynamicText: {
		type: 'string',
		default: generateBlocksDefaults.headline.dynamicText,
	},
	alignment: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignmentTablet,
	},
	alignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignmentMobile,
	},
	color: {
		type: 'string',
		default: generateBlocksDefaults.headline.color,
	},
	fontFamily: {
		type: 'string',
		default: generateBlocksDefaults.headline.fontFamily,
	},
	googleFont: {
		type: 'boolean',
		default: generateBlocksDefaults.headline.googleFont,
	},
	fontWeight: {
		type: 'string',
		default: generateBlocksDefaults.headline.fontWeight,
	},
	fontSize: {
		type: 'number',
		default: generateBlocksDefaults.headline.fontSize,
	},
	fontSizeTablet: {
		type: 'number',
		default: generateBlocksDefaults.headline.fontSizeTablet,
	},
	fontSizeMobile: {
		type: 'number',
		default: generateBlocksDefaults.headline.fontSizeMobile,
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	lineHeight: {
		type: 'number',
		default: generateBlocksDefaults.headline.lineHeight,
	},
	lineHeightTablet: {
		type: 'number',
		default: generateBlocksDefaults.headline.lineHeightTablet,
	},
	lineHeightMobile: {
		type: 'number',
		default: generateBlocksDefaults.headline.lineHeightMobile,
	},
	marginTop: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginTop,
	},
	marginTopTablet: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginTopTablet,
	},
	marginTopMobile: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginTopMobile,
	},
	marginBottom: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginBottom,
	},
	marginBottomTablet: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginBottomTablet,
	},
	marginBottomMobile: {
		type: 'number',
		default: generateBlocksDefaults.headline.marginBottomMobile,
	},
	letterSpacing: {
		type: 'number',
		default: generateBlocksDefaults.headline.letterSpacing,
	},
	letterSpacingTablet: {
		type: 'number',
		default: generateBlocksDefaults.headline.letterSpacingTablet,
	},
	letterSpacingMobile: {
		type: 'number',
		default: generateBlocksDefaults.headline.letterSpacingMobile,
	},
}
