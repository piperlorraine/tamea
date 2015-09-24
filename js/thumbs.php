<?php
function deleteThumbs($section) {
  print "Deleting old thumbnails for $section...<br>";
  $files = glob("../images/portfolio/thumbs/".$section.'/*'); // get all file names
  foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
  }
  print "Finished delete<br><br>";
}
function createThumbs( $section ) 
{
  $thumb_width = 38;
  $thumb_height = 38;
  // open the directory
  $pathToImages =  "../images/portfolio/".$section."/";
  $dir = opendir( $pathToImages );

  // loop through it, looking for any/all JPG files:
  while (false !== ($fname = readdir( $dir ))) {
    // parse path for the extension
    $info = pathinfo($pathToImages . $fname);
    // continue only if this is a JPEG image
    if ( strtolower($info['extension']) == 'jpg' ) 
    {
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
      $pathToThumbs = "../images/portfolio/thumbs/".$section."/";
      imagejpeg( $tmp_img, "{$pathToThumbs}{$fname}", 100 );
      print "Saved $fname<br>";
    }
  }
  print "<h1>$section all done!</h1>";
  // close the directory
  closedir( $dir );
}
// call createThumb function and pass to it as parameters the path 
// to the directory that contains images, the path to the directory
// in which thumbnails will be placed and the thumbnail's width. 
// We are assuming that the path will be a relative path working 
// both in the filesystem, and through the web for links
// createThumbs("upload/","upload/thumbs/",100);

?>

<form method="POST" action="">
  <label>Pick a section to refresh thumbnails:</label>
  <select name="selection">
    <option value="headshot">Headshots</option>
    <option value="portrait">Portraits</option>
    <option value="corporates">Corporate</option>
    <option value="families">Family Portraits</option>
    <option value="wedding">Weddings</option>
    <option value="fine_art">Fine Art</option>
  </select>
  <input type="submit" value="Redo Thumbnails">
</form>

<?php
if( isset($_POST['selection']) ) {
  deleteThumbs($_POST['selection']);
  createThumbs($_POST['selection']);
}
?>