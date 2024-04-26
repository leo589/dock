<?php

namespace SagresEdu;

use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\XmlElement;

/**
 * Class representing CardapioTType
 *
 * 
 * XSD Type: cardapio_t
 */
class CardapioTType
{

    /**
     * @var \DateTime $data
     * @Type("DateTime<'Y-m-d'>")
     * @SerializedName("edu:data")
     * @XmlElement(cdata=false)
     */
    private $data = null;

    /**
     * @var int $turno
     * @SerializedName("edu:turno")
     * @XmlElement(cdata=false)
     */
    private $turno = null;

    /**
     * @var string $descricaoMerenda
     * @SerializedName("edu:descricao_merenda")
     * @XmlElement(cdata=false)
     */
    private $descricaoMerenda = null;

    /**
     * @var bool $ajustado
     * @SerializedName("edu:ajustado")
     * @XmlElement(cdata=false)
     */
    private $ajustado = null;

    /**
     * Gets as data
     *
     * @return \DateTime
     * 
     */
     
    public function getData()
    {
        return $this->data;
    }

    /**
     * Sets a new data
     *
     * @param \DateTime $data
     * @return self
     */
    public function setData(\DateTime $data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Gets as turno
     *
     * @return int
     */
    public function getTurno()
    {
        return $this->turno;
    }

    /**
     * Sets a new turno
     *
     * @param int $turno
     * @return self
     */
    public function setTurno($turno)
    {
        $this->turno = $turno;
        return $this;
    }

    /**
     * Gets as descricaoMerenda
     *
     * @return string
     */
    public function getDescricaoMerenda()
    {
        return $this->descricaoMerenda;
    }

    /**
     * Sets a new descricaoMerenda
     *
     * @param string $descricaoMerenda
     * @return self
     */
    public function setDescricaoMerenda($descricaoMerenda)
    {
        $this->descricaoMerenda = $descricaoMerenda;
        return $this;
    }

    /**
     * Gets as ajustado
     *
     * @return bool
     */
    public function getAjustado()
    {
        return $this->ajustado;
    }

    /**
     * Sets a new ajustado
     *
     * @param bool $ajustado
     * @return self
     */
    public function setAjustado($ajustado)
    {
        $this->ajustado = $ajustado;
        return $this;
    }


}

