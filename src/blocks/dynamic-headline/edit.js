/**
 * Block: Headline
 */

import classnames from 'classnames';
import range from 'lodash/range';
import ColorPicker from '../../components/color-picker';
import TypographyControls from '../../components/typography';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Toolbar,
	PanelBody,
	RangeControl,
	SelectControl,
	BaseControl,
	TabPanel,
	DropdownMenu,
	ServerSideRender,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbHeadlineIds = [];

class GenerateBlockHeadline extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbHeadlineIds.push( id );
		} else if ( gbHeadlineIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbHeadlineIds.push( id );
		} else {
			gbHeadlineIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			content,
			dynamicText,
			element,
			alignment,
			alignmentTablet,
			alignmentMobile,
			color,
			fontFamily,
			googleFont,
			fontWeight,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			textTransform,
			lineHeight,
			lineHeightTablet,
			lineHeightMobile,
			marginTop,
			marginTopTablet,
			marginTopMobile,
			marginBottom,
			marginBottomTablet,
			marginBottomMobile,
			letterSpacing,
			letterSpacingTablet,
			letterSpacingMobile
		} = attributes;

		const css = `
			.editor-styles-wrapper .gb-headline-` + uniqueId + ` {
				font-family: ` + fontFamily + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + alignment + `;
				font-size: ` + fontSize + `px;
				color: ` + color + `;
				line-height: ` + lineHeight + `em;
				letter-spacing: ` + letterSpacing + `em;
				margin-top: ` + marginTop + `px;
				margin-bottom: ` + marginBottom + `px;
			}
		`

		return (
			<Fragment>

				<BlockControls>
					<Toolbar>
						<DropdownMenu
							icon={ getIcon( 'paragraph' ) }
							label={ __( 'Element' ) }
							controls={ [
								{
									title: 'paragraph',
									onClick: () => setAttributes( { element: 'p' } ),
								},
								{
									title: 'h1',
									onClick: () => setAttributes( { element: 'h1' } ),
								},
								{
									title: 'h2',
									onClick: () => setAttributes( { element: 'h2' } ),
								},
								{
									title: 'h3',
									onClick: () => setAttributes( { element: 'h3' } ),
								},
								{
									title: 'h4',
									onClick: () => setAttributes( { element: 'h4' } ),
								},
							] }
						/>
					</Toolbar>

					<AlignmentToolbar
						isCollapsed={ false }
						value={ alignment }
						onChange={ ( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						} }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody>
						<TabPanel className="headline-tab-panel gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'generateblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name ? (
												<Fragment>
													<SelectControl
														label={ __( 'Dynamic Text', 'generateblocks' ) }
														value={ dynamicText }
														options={ [
															{ label: __( 'Post Title', 'generateblocks' ), value: 'post-title' },
															{ label: __( 'Author', 'generateblocks' ), value: 'author' },
															{ label: 'h2', value: 'h2' },
															{ label: 'h3', value: 'h3' },
															{ label: 'h4', value: 'h4' },
															{ label: 'h5', value: 'h5' },
															{ label: 'h6', value: 'h6' },
														] }
														onChange={ ( dynamicText ) => { setAttributes( { dynamicText } ) } }
													/>

													<SelectControl
														label={ __( 'Element', 'generateblocks' ) }
														value={ element }
														options={ [
															{ label: 'p', value: 'p' },
															{ label: 'h1', value: 'h1' },
															{ label: 'h2', value: 'h2' },
															{ label: 'h3', value: 'h3' },
															{ label: 'h4', value: 'h4' },
															{ label: 'h5', value: 'h5' },
															{ label: 'h6', value: 'h6' },
														] }
														onChange={ ( element ) => { setAttributes( { element } ) } }
													/>

													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignment }
														onChange={ ( value ) => {
															setAttributes( { alignment: value } );
														} }
													/>

													<ColorPicker
														label={ __( 'Color', 'generateblocks' ) }
														value={ color }
														onChange={ ( value ) =>
															setAttributes( {
																color: value
															} )
														}
														alpha={ false }
													/>

													<TypographyControls { ...this.props }
														valueFontFamily={ fontFamily }
														valueFontWeight={ fontWeight }
														valueGoogleFont={ googleFont }
														valueTextTransform={ textTransform }
														valueFontSize={ fontSize }
														valueLineHeight={ lineHeight }
														valueLetterSpacing={ letterSpacing }
														attrFontFamily={ 'fontFamily' }
														attrGoogleFont={ 'googleFont' }
														attrFontWeight={ 'fontWeight' }
														attrTextTransform={ 'textTransform' }
														attrFontSize={ 'fontSize' }
														attrLineHeight={ 'lineHeight' }
														attrLetterSpacing={ 'letterSpacing' }
														initialFontSize={ generateBlocksDefaults.headline.fontSize }
														initialLineHeight={ generateBlocksDefaults.headline.lineHeight }
														initialLetterSpacing={ generateBlocksDefaults.headline.letterSpacing }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'generateblocks' ) }
														value={ marginTop }
														onChange={ ( value ) => {
															setAttributes( {
																marginTop: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'generateblocks' ) }
														value={ marginBottom }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottom: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ generateBlocksDefaults.headline.marginBottom }
													/>
												</Fragment>
											) : '' }

											{ 'tablet' === tab.name ? (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentTablet }
														onChange={ ( value ) => {
															setAttributes( { alignmentTablet: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeTablet }
														valueLineHeight={ lineHeightTablet }
														valueLetterSpacing={ letterSpacingTablet }
														attrFontSize={ 'fontSizeTablet' }
														attrLineHeight={ 'lineHeightTablet' }
														attrLetterSpacing={ 'letterSpacingTablet' }
														initialFontSize={ generateBlocksDefaults.headline.fontSizeTablet }
														initialLineHeight={ generateBlocksDefaults.headline.lineHeightTablet }
														initialLetterSpacing={ generateBlocksDefaults.headline.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'generateblocks' ) }
														value={ marginTopTablet }
														onChange={ ( value ) => {
															setAttributes( {
																marginTopTablet: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'generateblocks' ) }
														value={ marginBottomTablet }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottomTablet: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ generateBlocksDefaults.headline.marginBottomTablet }
													/>
												</Fragment>
											) : '' }

											{ 'mobile' === tab.name ? (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentMobile }
														onChange={ ( value ) => {
															setAttributes( { alignmentMobile: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeMobile }
														valueLineHeight={ lineHeightMobile }
														valueLetterSpacing={ letterSpacingMobile }
														attrFontSize={ 'fontSizeMobile' }
														attrLineHeight={ 'lineHeightMobile' }
														attrLetterSpacing={ 'letterSpacingMobile' }
														initialFontSize={ generateBlocksDefaults.headline.fontSizeMobile }
														initialLineHeight={ generateBlocksDefaults.headline.lineHeightMobile }
														initialLetterSpacing={ generateBlocksDefaults.headline.letterSpacingMobile }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'generateblocks' ) }
														value={ marginTopMobile }
														onChange={ ( value ) => {
															setAttributes( {
																marginTopMobile: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'generateblocks' ) }
														value={ marginBottomMobile }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottomMobile: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ generateBlocksDefaults.headline.marginBottomMobile }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'generateblocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'generateblocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<RichText
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'core/mark' ] }
					tagName={ element }
					value={ generateBlocksDynamicText[ dynamicText ] }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gb-headline': true,
						[`gb-headline-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					placeholder={ __( 'Write headline…' ) }
				/>
			</Fragment>
		);
	}
}

export default ( GenerateBlockHeadline );
