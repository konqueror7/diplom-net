<?php

class Movie extends DataRecordModel
{
    public $name;
    public $content;
    public $image;
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

        if (isset($_FILES['image'])) {
            $this->image = $_POST['image_name'];
            // $this->image = $_FILES['image']['name'];
            move_uploaded_file($_FILES['image']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . Config::POSTERS_DIRECTORY . '/' . $_POST['image_name']);
        } else {
            $this->image = 'No image in $_FILES!';
        }


        // $this->image = 'i/poster.png';
        $this->duration = 0;
        $this->producer = '';

        $this->commit();
    }
}
