<?php

/**
 * Класс Movie создает определяет свойства и методы
 * экземпляра класса для сущности "сеанс"
 */
class Session extends DataRecordModel
{
    public $hall_id;
    public $film_id;
    public $start_time;

    public function addNewSession($post)
    {
        if (isset($post['hall_id'])) {
            $this->hall_id = $post['hall_id'];
        }

        if (isset($post['film_id'])) {
            $this->film_id = $post['film_id'];
        }

        if (isset($post['start_time'])) {
            $this->start_time = $post['start_time'];
        }

        $this->commit();
    }
}
