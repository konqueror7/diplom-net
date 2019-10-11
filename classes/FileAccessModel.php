<?php

class FileAccessModel
{
    protected $fileName;

    protected $file;

    /**
     * Конструктор создает объект со свойством filename
     * в которое записывается относительный путь до json-файла
     * составляется из содержимого константы Config::DATABASE_PATH
     * имени json-файла, переданного в качестве параметра
     * и расширения '.json'
     * @param string $jsonFileName имя json-файла
     */
    public function __construct($jsonFileName)
    {
        $this->fileName = Config::DATABASE_PATH.$jsonFileName.'.json';
    }

    /**
     * Открытие json-файла в указанном режиме
     * @param  string $modeConnect режим чтения или записи
     */
    private function connect($modeConnect)
    {
        $this->file = fopen($this->fileName, $modeConnect);
    }

    /**
     * закрытие json-файла
     */
    private function disconnect()
    {
        fclose($this->file);
    }

    /**
     * Извлечение всего содержимого из json-файла
     * с последующим его закрытием
     * @return string переменная в которую извлекается содержимое
     */
    public function read()
    {
        $this->connect('r');
        $filecontent = fread($this->file, filesize($this->fileName));
        $this->disconnect();
        return $filecontent;
    }

    /**
     * Запись нового содержимого в json-файл
     * с уничтожением прежних данных
     * с последующим его закрытием
     * @param string $textContent переменная с новым содержимым
     */
    public function write($textContent)
    {
        $this->connect('w');
        fwrite($this->file, $textContent);
        $this->disconnect();
    }
}
