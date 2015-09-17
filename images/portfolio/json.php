<?php
  $section = $_GET['section'];
  $files = glob($section.'/*.jpg');

  $jsonFiles = array();
  $jsonFiles['item'] = array();

  foreach ($files as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['item'][] = $newArray;
  }

  echo json_encode($jsonFiles);
?>