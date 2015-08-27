<section class="projects">
  <?php foreach(page('projects')->children()->visible() as $project): ?>

  <div class="projects_row">

    <?php foreach($project->images()->sortBy('sort', 'asc') as $image): ?>
      <img src="<?php echo $image->url() ?>" alt="<?php echo $project->title()->html() ?>" >
    <?php endforeach ?>

  </div>

  <?php endforeach ?>
</section>
