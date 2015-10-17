<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: false
files:
  sortable: true
  fields:
    author:
      label: Author
      type: text
    alt:
      label: Alttext
      type: text
    titletag:
      label: Description (Title-tag)
      type: textarea
fields:
  title:
    label: Title
    type:  text
  headline:
    label: Headline
    type:  text
  text:
    label: Text
    type:  textarea
  tags:
    label: Tags
    type:  tags