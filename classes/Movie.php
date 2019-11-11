<?php

class Movie extends DataRecordModel
{
    public $name;
    public $content;
    public $poster;
    public $duration;
    public $producer;

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

        if (isset($_FILES['poster'])) {
            // $this->image = $_POST['image_name'];
            $this->poster = $_FILES['poster']['name'];
            move_uploaded_file($_FILES['poster']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . Config::POSTERS_DIRECTORY .
            '/' . $_FILES['poster']['name']);
        } else {
            $this->poster = 'No image in $_FILES!';
        }

        // if (isset($_FILES['image'])) {
        //     $this->image = $_POST['image_name'];
        //     // $this->image = $_FILES['image']['name'];
        //     move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . Config::POSTERS_DIRECTORY . '/' . $_POST['image_name']);
        // } else {
        //     $this->image = 'No image in $_FILES!';
        // }


        // $this->image = 'i/poster.png';
        if (isset($post['duration'])) {
            $this->duration = $post['duration'];
          // code...
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
