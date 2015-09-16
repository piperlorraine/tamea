<?php
  
  $corporateFiles = glob('corporate/*.jpg');
  $familyFiles = glob('families/*.jpg');
  $fineArtFiles = glob('fine_art/*.jpg');
  $headshotFiles = glob('headshots/*.jpg');
  $portraitFiles = glob('portraits/*.jpg');
  $weddingFiles = glob('weddings/*.jpg');
  
  /*
  $corporateSize = sizeof($corporateFiles);
  $familySize = sizeof($familyFiles);
  $fineArtSize = sizeof($fineArtFiles);
  $headshotSize = sizeof($headshotFiles);
  $portraitSize = sizeof($portraitFiles);
  $weddingSize = sizeof($weddingFiles);
  */
  
  $jsonFiles = array();
  
  $jsonFiles['corporate'] = array();
  $jsonFiles['families'] = array();
  $jsonFiles['fine_art'] = array();
  $jsonFiles['headshots'] = array();
  $jsonFiles['portraits'] = array();
  $jsonFiles['weddings'] = array();
/*
  $i = 1;
  foreach ($corporateFiles as $value) {
    $newArray = array("url" => "images/corporate/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Landscape - ".$i.' of '.$landscapeSize );
    $i++;
    $jsonFiles['landscape'][] = $newArray;
  }
  */

  foreach ($corporateFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['corporate'][] = $newArray;
  }
  foreach ($familyFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['families'][] = $newArray;
  }
  foreach ($fineArtFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['fine_art'][] = $newArray;
  }
  foreach ($headshotFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['headshots'][] = $newArray;
  }
  foreach ($portraitFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['portraits'][] = $newArray;
  }
  foreach ($weddingFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/portfolio/thumbs/".$value );
    $jsonFiles['weddings'][] = $newArray;
  }

  echo json_encode($jsonFiles);
?>