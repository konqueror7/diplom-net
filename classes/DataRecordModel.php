<?php

class DataRecordModel
{
    private $filename;
    private $guid;
    //Создает пустой объект без ID,
    //если в параметрах функции указать ID вида 'o1' то,
    //создает пустой объект с ID

    /**
     * Конструктор создает объект с пустым ID
     * по умолчанию в качестве параметра
     * записвывает в свойство filename имя файла,
     * составляя его из имени дочернего класса
     * в нижнем регистре с добавлением суффикса 's'
     * методом позднего статического связывания
     * @param string $guid порядковый номер объекта в json-файле
     */
    public function __construct(string $guid = null)
    {
        $this->filename = strtolower(static::class) . 's';
        $this->guid = $guid;
    }

    /**
     * Извлекает из файла с именем, указанным
     * в свойстве filename все записи о заказах
     * в переменную $date объект класса JsonDataArray
     * Добавляет в него новую запись или обновляет
     * существующую и сохраняет обратно в json-файл
     */
    public function commit()
    {
        $data = new JsonDataArray($this->filename);
        if (is_null($this->guid)) {
            $this->guid = $data->add($this);
        } else {
            $data->changeObjByGuid($this->guid, $this);
        }
        $data->save();
    }

    /**
    * Извлекает из файла с именем, указанным
    * в свойстве filename все записи о заказах
    * в переменную $date объект класса JsonDataArray
     * Удаляет запись по ее номеру ID указанному в $guid
     * из переменной $date объекта класса JsonDataArray
     * и сохраняет обратно в json-файл
     */
    public function delete()
    {
        $data = new JsonDataArray($this->filename);
        if (!is_null($this->guid)) {
            $this->guid = $data->byGuid($this->guid)->delete();
        }
        $data->save();
    }
}
