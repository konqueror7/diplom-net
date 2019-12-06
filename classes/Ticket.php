<?php

class Ticket extends DataRecordModel
{
    public $session_id;
    public $places;
    // public $ticket_guid;
    private $filename;
    private $guid;

    public function __construct(string $guid = null)
    {
        $this->filename = strtolower(static::class) . 's';
        $this->guid = $guid;
    }

    public function commit()
    {
        $data = new JsonDataArray($this->filename);
        if (is_null($this->guid)) {
            $this->guid = $data->add($this);
            $ticket_guid = $this->guid;
        } else {
            $data->changeObjByGuid($this->guid, $this);
        }

        $data->save();

        // return $this->guid;
        return $ticket_guid;
    }

    public function addNewTicket($post)
    {
        if (isset($post['session_id'])) {
            $this->session_id = $post['session_id'];
        }

        if (isset($post['places'])) {
            $this->places = json_decode($post['places']);
        }

        return $this->commit();

        // return $this->commit();

        // $this->ticket_guid = $this->guid;
        //
        // return $this->ticket_guid;
    }
}
