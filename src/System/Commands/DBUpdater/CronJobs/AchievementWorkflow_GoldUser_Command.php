<?php

namespace App\System\Commands\DBUpdater\CronJobs;

use App\DB\Entity\User\Achievements\Achievement;
use App\DB\Entity\User\User;
use App\User\Achievements\AchievementManager;
use App\User\UserManager;
use Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AchievementWorkflow_GoldUser_Command extends Command
{
  /**
   * @var string|null
   *
   * @override from Command
   */
  protected static $defaultName = 'catrobat:workflow:achievement:gold_user';

  public function __construct(protected UserManager $user_manager, protected AchievementManager $achievement_manager)
  {
    parent::__construct();
  }

  protected function configure(): void
  {
    $this->setName(self::$defaultName)
      ->setDescription('Unlocking gold_user user achievements')
    ;
  }

  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $this->addGoldUserAchievementToEveryUser($output);

    return 0;
  }

  protected function addGoldUserAchievementToEveryUser(OutputInterface $output): void
  {
    $user_achievements = $this->achievement_manager->findUserAchievementsOfAchievement(Achievement::GOLD_USER);
    $excluded_user_id_list = array_map(fn ($user_achievement) => $user_achievement->getUser()->getId(), $user_achievements);
    $active_user_ID_list = $this->user_manager->getActiveUserIDList(4);
    $user_id_list = array_values(array_diff($active_user_ID_list, $excluded_user_id_list));

    foreach ($user_id_list as $user_id) {
      /* @var User|null $user */
      $user = $this->user_manager->find($user_id);
      if (!is_null($user)) {
        try {
          $this->achievement_manager->unlockAchievementGoldUser($user);
        } catch (Exception $exception) {
          $output->writeln($exception->getMessage());
        }
      }
    }
  }
}
