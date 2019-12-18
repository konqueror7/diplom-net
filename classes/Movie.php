<?php
/**
 * Класс Movie создает определяет свойства и методы
 * экземпляра класса для сущности "фильм"
 */
class Movie extends DataRecordModel
{
    public $name;
    public $content;
    public $poster;
    public $duration;
    public $producer;

    /**
    * Создание новой записи о фильме в файле movies.json
    */
    public function addNewMovie($post)
    {
        if (isset($post['name'])) {
            $this->name = $post['name'];
        } else {
            $this->name = 'Movie';
        }

        if (isset($post['content'])) {
            $this->content = $post['content'];
        } else {
            $this->content = 'No content';
        }
        /**
         * Сохранение файла с изображением постера фильма
         * в папку указаную в переменной Config::POSTERS_DIRECTORY
         */
        if (isset($_FILES['poster'])) {
            $this->poster = $_FILES['poster']['name'];
            move_uploaded_file($_FILES['poster']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . Config::POSTERS_DIRECTORY .
            '/' . $_FILES['poster']['name']);
        } else {
            $this->poster = 'No image in $_FILES!';
        }

        if (isset($post['duration'])) {
            $this->duration = $post['duration'];
        } else {
            $this->duration = 0;
        }

        if (isset($post['producer'])) {
            $this->producer = $post['producer'];
        } else {
            $this->producer = 'No producer';
        }

        $this->commit();
    }
}
