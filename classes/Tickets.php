<?php


/**
 * Класс для работы с записями из файла tickets.json
 */
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

        /**
         * Создание QR-кода с помощью библиотеки 'PHP QR Code'
         */
        if (isset($post['qrcode'])) {
            $mdname = md5($post['qrcode']) . '.png';
            $qrFilename = $_SERVER['DOCUMENT_ROOT'] . Config::QRPNG_DIRECTORY . '/' . $mdname;
            $updTicket->qrcode = $mdname;
            $errorCorrectionLevel = 'H';
            $matrixPointSize = 7;
            QRcode::png($post['qrcode'], $qrFilename, $errorCorrectionLevel, $matrixPointSize, 2);
        }

        $this->save();
    }
}
