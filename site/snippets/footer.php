  <footer class="footer cf" role="contentinfo">

    <div class="copyright">
      <?php echo $site->copyright()->kirbytext() ?>
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