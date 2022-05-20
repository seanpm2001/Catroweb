<?php

namespace App\Project\CatrobatCode\Statements;

class NextLookStatement extends Statement
{
  /**
   * @var string
   */
  final public const BEGIN_STRING = 'next look';
  /**
   * @var string
   */
  final public const END_STRING = '<br/>';

  /**
   * NextLookStatement constructor.
   *
   * @param mixed $statementFactory
   * @param mixed $xmlTree
   * @param mixed $spaces
   */
  public function __construct($statementFactory, $xmlTree, $spaces)
  {
    parent::__construct($statementFactory, $xmlTree, $spaces,
      self::BEGIN_STRING,
      self::END_STRING);
  }

  public function getBrickText(): string
  {
    return 'Next look';
  }

  public function getBrickColor(): string
  {
    return '1h_brick_green.png';
  }
}
