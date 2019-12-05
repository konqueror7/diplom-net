<?php

class Ticket extends DataRecordModel
{
    public $session_id;
    public $places;

    public function addNewTicket($post)
    {
        if (isset($post['session_id'])) {
            $this->session_id = $post['session_id'];
        }

        if (isset($post['places'])) {
            $this->places = json_decode($post['places']);
        }

        $this->commit();
    }
}
