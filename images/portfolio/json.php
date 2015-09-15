<?php
  
  $landscapeFiles = glob('landscape/*.jpg');
  $stillFiles = glob('still_life-chairs/*.jpg');
  $figureFiles = glob('figure/*.jpg');
  $collageFiles = glob('collage/*.jpg');
  $portraitFiles = glob('portraits/*.jpg');
  
  $landscapeSize = sizeof($landscapeFiles);
  $stillSize = sizeof($stillFiles);
  $figureSize = sizeof($figureFiles);
  $collageSize = sizeof($collageFiles);
  $portraitSize = sizeof($portraitFiles);
  
  $jsonFiles = array();
  
  $jsonFiles['landscape'] = array();
  $jsonFiles['still'] = array();
  $jsonFiles['figure'] = array();
  $jsonFiles['collage'] = array();
  $jsonFiles['portrait'] = array();
  
  $i = 1;
  foreach ($landscapeFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Landscape - ".$i.' of '.$landscapeSize );
    $i++;
    $jsonFiles['landscape'][] = $newArray;
  }
  
  $i = 1;
  foreach ($stillFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Still Life and Chairs - ".$i.' of '.$stillSize );
    $i++;
    $jsonFiles['still'][] = $newArray;
  }
  
  $i = 1;
  foreach ($figureFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Figure - ".$i.' of '.$figureSize);
    $i++;
    $jsonFiles['figure'][] = $newArray;
  }
  
  $i = 1;
  foreach ($collageFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Collage - ".$i.' of '.$collageSize );
    $i++;
    $jsonFiles['collage'][] = $newArray;
  }
  
  $i = 1;
  foreach ($portraitFiles as $value) {
    $newArray = array("url" => "images/portfolio/".$value, "thumbUrl" => "images/thumbs/".$value, "caption" => "Portrait - ".$i.' of '.$portraitSize );
    $i++;
    $jsonFiles['portrait'][] = $newArray;
  }
  echo json_encode($jsonFiles);
?>