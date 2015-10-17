<section class="projects">
	<?php foreach(page('projects')->children()->visible() as $project): ?>
		<div class="projects_wrap">
		<div class="projects_row">
			<?php foreach($project->images()->sortBy('sort', 'asc') as $image): ?>
				<div itemscope itemtype="http://schema.org/CreativeWork">
					<img 
						data-src="<?php echo $image->url() ?>" 
						alt="<?php echo $image->alt() ?>" 
						<?php if($image->titletag()->empty()): ?>
							class="project-image lazyload"
						<?php else: ?>
							class="project-image lazyload noCourser decreaseOpacity"
							title="<?php echo $image->titletag() ?>"
						<?php endif ?>
						style="max-width: <?php echo $image->width() ?>px" 
						itemprop="associatedMedia">
					<meta itemprop="creator" content="<?php echo $image->author() ?>">
				</div>
			<?php endforeach ?>
		</div>
		<div class="projects_row">
		<div class="description flex-col"><?php echo $project->headline()->kirbytext() ?></div>
		<div class="description flex-col"><?php echo $project->text()->kirbytext() ?></div>
		</div>
		</div>
	<?php endforeach ?>
</section>
