<?php

/**
 * Класс для изменения записей из файла halls.json
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

        if (isset($post['active'])) {
            $updHall->active = json_decode($post['active']);
        }
        $this->save();
    }
}
