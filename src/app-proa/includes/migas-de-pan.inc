<nav class="migas-de-pan">
    <ul>
        <?php foreach ($migas as $miga): ?>
            <li>
                <?php if (isset($miga['url'])): ?>
                    <a href="<?= $miga['url'] ?>"><?= $miga['label'] ?></a>
                <?php else: ?>
                    <span><?= $miga['label'] ?></span>
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>
