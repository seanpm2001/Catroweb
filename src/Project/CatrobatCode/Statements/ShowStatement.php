<?php

declare(strict_types=1);

namespace App\Project\CatrobatCode\Statements;

class ShowStatement extends Statement
{
  final public const string BEGIN_STRING = 'show';

  final public const string END_STRING = '<br/>';

  public function __construct(mixed $statementFactory, mixed $xmlTree, mixed $spaces)
  {
    parent::__construct($statementFactory, $xmlTree, $spaces,
      self::BEGIN_STRING,
      self::END_STRING);
  }

  public function getBrickText(): string
  {
    return 'Show';
  }

  public function getBrickColor(): string
  {
    return '1h_brick_green.png';
  }
}
