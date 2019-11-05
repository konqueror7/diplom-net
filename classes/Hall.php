<?php

class Hall extends DataRecordModel
{
    public $name;
    public $rows;
    public $places;
    public $vip;
    public $dis;
    public $vip_price;
    public $std_price;
    // public $places_array;
    // public $seats_arrow;

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

        if (isset($_POST['vip'])) {
            $this->vip = json_decode($_POST['vip']);
        } else {
            $this->vip = [];
        }

        if (isset($_POST['dis'])) {
            $this->dis = json_decode($_POST['dis']);
        } else {
            $this->dis = [];
        }

        if (isset($_POST['vip_price'])) {
            $this->vip_price = json_decode($_POST['vip_price']);
        } else {
            $this->vip_price = 0;
        }

        if (isset($_POST['std_price'])) {
            $this->std_price = json_decode($_POST['std_price']);
        } else {
            $this->std_price = 0;
        }

        // if (isset($_POST['places_array'])) {
        //     $this->places_array = json_decode($_POST['places_array']);
        // } else {
        //     $this->places_array = null;
        // }
    }
}
