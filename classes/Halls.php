<?php

/**
 * Класс для работы с записями из файла halls.json
 */
class Halls extends JsonDataArray
{

    public function getHall($id)
    {
        $resultQuery = $this->newQuery()->byGuid($id)->getObjs(true);
        return $resultQuery[$id];
    }

    public function updateHallFromPost($post)
    {
        $updHall = $this->getHall($post['update_id']);
        if (isset($post['name'])) {
            $updHall->name = $post['name'];
        }

        if (isset($post['rows'])) {
            $updHall->rows = intval($post['rows']);
        }

        if (isset($post['places'])) {
            $updHall->places = intval($post['places']);
        }

        if (isset($post['vip'])) {
            $updHall->vip = json_decode($post['vip']);
        }

        if (isset($post['dis'])) {
            $updHall->dis = json_decode($post['dis']);
        }

        if (isset($post['vip_price'])) {
            $updHall->vip_price = json_decode($post['vip_price']);
        }

        if (isset($post['std_price'])) {
            $updHall->std_price = json_decode($post['std_price']);
        }
        $this->save();
    }
    // public function updateHallFromPost($id)
    // {
    //     if (isset($_POST['name'])) {
    //         $this->getHall($id)->name = $_POST['name'];
    //     }
    //
    //     if (isset($_POST['rows'])) {
    //         $this->getHall($id)->rows = intval($_POST['rows']);
    //     }
    //
    //     if (isset($_POST['places'])) {
    //         $this->getHall($id)->places = intval($_POST['places']);
    //     }
    //
    //     if (isset($_POST['vip'])) {
    //         $this->getHall($id)->vip = json_decode($_POST['vip']);
    //     }
    //
    //     if (isset($_POST['dis'])) {
    //         $this->getHall($id)->dis = json_decode($_POST['dis']);
    //     }
    //
    //     if (isset($_POST['vip_price'])) {
    //         $this->getHall($id)->vip_price = json_decode($_POST['vip_price']);
    //     }
    //
    //     if (isset($_POST['std_price'])) {
    //         $this->getHall($id)->std_price = json_decode($_POST['std_price']);
    //     }
    // }
}
