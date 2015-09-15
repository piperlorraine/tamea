<?php
function createThumbs( $pathToImages, $pathToThumbs, $thumb_width, $thumb_height ) 
{
  // open the directory
  $dir = opendir( $pathToImages );

  // loop through it, looking for any/all JPG files:
  while (false !== ($fname = readdir( $dir ))) {
    // parse path for the extension
    $info = pathinfo($pathToImages . $fname);
    // continue only if this is a JPEG image
    if ( strtolower($info['extension']) == 'jpg' && !file_exists($pathToThumbs . $fname)) 
    {
      //echo "Creating thumbnail for {$fname} <br />";

      // load image and get image size
      $img = imagecreatefromjpeg( "{$pathToImages}{$fname}" );
      $width = imagesx( $img );
      $height = imagesy( $img );
      
      $original_aspect = $width / $height;
      $thumb_aspect = $thumb_width / $thumb_height;

      if ( $original_aspect >= $thumb_aspect ) {
         // If image is wider than thumbnail (in aspect ratio sense)
         $new_height = $thumb_height;
         $new_width = $width / ($height / $thumb_height);
      } else {
         // If the thumbnail is wider than the image
         $new_width = $thumb_width;
         $new_height = $height / ($width / $thumb_width);
      }

      // calculate thumbnail size
      //$new_width = $thumbWidth;
      //$new_height = floor( $height * ( $thumbWidth / $width ) );

      // create a new temporary image
      $tmp_img = imagecreatetruecolor( $thumb_width, $thumb_height );

      // copy and resize old image into new image 
      imagecopyresampled( $tmp_img, $img, 
          0 - ($new_width - $thumb_width) / 2, 0 - ($new_height - $thumb_height) / 2, 
          0,0,
          $new_width, $new_height, 
          $width, $height );

      // save thumbnail into a file
      imagejpeg( $tmp_img, "{$pathToThumbs}{$fname}", 100 );
    }
  }
  // close the directory
  closedir( $dir );
}
// call createThumb function and pass to it as parameters the path 
// to the directory that contains images, the path to the directory
// in which thumbnails will be placed and the thumbnail's width. 
// We are assuming that the path will be a relative path working 
// both in the filesystem, and through the web for links
// createThumbs("upload/","upload/thumbs/",100);

createThumbs("../images/portfolio/landscape/","../images/thumbs/landscape/",150,100);
createThumbs("../images/portfolio/still_life-chairs/","../images/thumbs/still_life-chairs/",150,100);
createThumbs("../images/portfolio/figure/","../images/thumbs/figure/",150,100);
createThumbs("../images/portfolio/collage/","../images/thumbs/collage/",150,100);
createThumbs("../images/portfolio/portraits/","../images/thumbs/portraits/",150,100);
?>