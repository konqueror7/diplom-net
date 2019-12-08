<?php

class Tickets extends JsonDataArray
{

    public function getTicket($id)
    {
        $resultQuery = $this->newQuery()->byGuid($id)->getObjs(true);
        return $resultQuery[$id];
    }

    public function updateTicketFromPost($post)
    {
        $updTicket = $this->getTicket($post['update_id']);

        if (isset($post['session_id'])) {
            $updTicket->session_id = $post['session_id'];
        }

        if (isset($post['places'])) {
            $updTicket->places = $post['places'];
        }

        if (isset($post['qrcode'])) {
        // if (isset($post['qrtext'])) {
            // $updTicket->qrtext = $post['qrtext'];
            $mdname = md5($post['qrcode']) . '.png';
            // $mdname = md5($post['qrtext']) . '.png';
            $qrFilename = $_SERVER['DOCUMENT_ROOT'] . Config::QRPNG_DIRECTORY . '/' . $mdname;
            $updTicket->qrcode = $mdname;
            $errorCorrectionLevel = 'H';
            $matrixPointSize = 7;
            QRcode::png($post['qrcode'], $qrFilename, $errorCorrectionLevel, $matrixPointSize, 2);
        }

        // if (isset($post['qrimg'])) {
        //     $updTicket->qrimg = $post['qrimg'];
        // }

        $this->save();

        // return $updTicket;
        // return $updTicket->qrimg;
    }
}
