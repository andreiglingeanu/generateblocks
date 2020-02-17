<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'plugins_loaded', 'generateblocks_register_dynamic_blocks' );

function generateblocks_register_dynamic_blocks() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'generateblocks/dynamic-headline', array(
		'render_callback' => 'generateblocks_do_dynamic_headline_block'
	) );
}

function generateblocks_do_dynamic_headline_block( $attributes ) {
	$defaults = generateblocks_get_block_defaults();

	$settings = wp_parse_args(
		$attributes,
		$defaults['headline']
	);

	$text = '';

	if ( 'post-title' === $settings['dynamicText'] ) {
		if ( is_singular() ) {
			$text = get_the_title();
		} elseif ( is_tax() || is_category() || is_tag() ) {
			$text = get_queried_object()->name;
		} elseif ( is_post_type_archive() ) {
			$text = post_type_archive_title( '', false );
		} elseif ( is_archive() && function_exists( 'get_the_archive_title' ) ) {
			$text = get_the_archive_title();
		} elseif ( is_home() ) {
			$text = __( 'Blog', 'generateblocks' );
		}
	}

	if ( 'author' === $settings['dynamicText'] ) {
		global $post;
		$author_id = $post->post_author;

		$text = sprintf( '<span class="author vcard" itemtype="http://schema.org/Person" itemscope="itemscope" itemprop="author"><a class="url fn n" href="%1$s" title="%2$s" rel="author" itemprop="url"><span class="author-name" itemprop="name">%3$s</span></a></span>',
			esc_url( get_author_posts_url( $author_id ) ),
			esc_attr( sprintf( __( 'View all posts by %s', 'gp-premium' ), get_the_author_meta( 'display_name', $author_id ) ) ),
			esc_html( get_the_author_meta( 'display_name', $author_id ) )
		);
	}

	$classes = array(
		'gb-headline',
		'gb-headline-' . $settings['uniqueId'],
		'' !== $settings['cssClasses'] ? $settings['cssClasses'] : '',
	);

	if ( ! $text ) {
		return;
	}

	return sprintf(
		'<%1$s class="%3$s">%2$s</%1$s>',
		$settings['element'],
		$text,
		implode( ' ', $classes )
	);
}