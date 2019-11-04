<?php

class Hall extends DataRecordModel
{
    public $name;
    public $rows;
    public $places;
    public $seats_arrow;

    public function addHallFromPost()
    {
        if (isset($_POST['name'])) {
            $this->name = $_POST['name'];
        } else {
            $this->name = 'Hall';
        }
        if (isset($_POST['rows'])) {
            $this->rows = intval($_POST['rows']);
        } else {
            $this->rows = 0;
        }
        if (isset($_POST['places'])) {
            $this->places = intval($_POST['places']);
        } else {
            $this->places = 0;
        }
        if (isset($_POST['seats_arrow'])) {
            $this->seats_arrow = json_decode($_POST['seats_arrow']);
        } else {
            $this->seats_arrow = null;
        }
    }
}
