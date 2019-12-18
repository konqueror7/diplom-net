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
    public $active;

    public function addNewHall($name)
    {
        if (isset($name)) {
            $this->name = $name;
        } else {
            $this->name = 'Hall';
        }

        $this->active = false;
        $this->rows = 0;
        $this->places = 0;
        $this->vip = [];
        $this->dis = [];
        $this->vip_price = 0;
        $this->std_price = 0;

        $this->commit();
    }
}
