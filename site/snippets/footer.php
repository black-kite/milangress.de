  <footer class="footer cf" role="contentinfo">

    <div class="copyright">
      <?php echo $site->copyright()->kirbytext() ?>
    </div>

    <div class="colophon">
      <a href="http://getkirby.com/made-with-kirby-and-love">Made with Kirby and <b>♥</b></a>
    </div>

  </footer>
 </div>
<!-- END Wrapper -->
<!-- Asyncron loading of secondary assets -->
<?php echo css('assets/css/main.css') ?>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <?php echo js('assets/javascript/min/script.js') ?>
</body>
</html>