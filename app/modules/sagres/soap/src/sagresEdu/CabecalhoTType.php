<?php

namespace SagresEdu;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\XmlElement;

/**
 * Class representing CabecalhoTType
 *
 * 
 * XSD Type: cabecalho_t
 */
class CabecalhoTType
{

    /**
     * @var string $codigoUnidGestora
     * @SerializedName("edu:codigoUnidGestora")
     * @XmlElement(cdata=false)
     */
    private $codigoUnidGestora = null;

    /**
     * @var string $nomeUnidGestora
     * @SerializedName("edu:nomeUnidGestora")
     * @XmlElement(cdata=false)
     */
    private $nomeUnidGestora = null;

    /**
     * @var string $cpfResponsavel
     * @SerializedName("edu:cpfResponsavel")
     * @XmlElement(cdata=false)
     */
    private $cpfResponsavel = null;

    /**
     * @var string $cpfGestor
     * @SerializedName("edu:cpfGestor")
     * @XmlElement(cdata=false)
     */
    private $cpfGestor = null;

    /**
     * @var int $anoReferencia
     * @SerializedName("edu:anoReferencia")
     * @XmlElement(cdata=false)
     */
    private $anoReferencia = null;

    /**
     * @var int $mesReferencia
     * @SerializedName("edu:mesReferencia")
     * @XmlElement(cdata=false)
     */
    private $mesReferencia = null;

    /**
     * @var int $versaoXml
     * @SerializedName("edu:versaoXml")
     * @XmlElement(cdata=false)
     */
    private $versaoXml = null;

    /**
     * @var int $diaInicPresContas
     * @SerializedName("edu:diaInicPresContas")
     * @XmlElement(cdata=false)
     */
    private $diaInicPresContas = null;

    /**
     * @var int $diaFinaPresContas
     * @SerializedName("edu:diaFinaPresContas")
     * @XmlElement(cdata=false)
     */
    private $diaFinaPresContas = null;

    /**
     * Gets as codigoUnidGestora
     *
     * @return string
     */
    public function getCodigoUnidGestora()
    {
        return $this->codigoUnidGestora;
    }

    /**
     * Sets a new codigoUnidGestora
     *
     * @param string $codigoUnidGestora
     * @return self
     */
    public function setCodigoUnidGestora($codigoUnidGestora)
    {
        $this->codigoUnidGestora = $codigoUnidGestora;
        return $this;
    }

    /**
     * Gets as nomeUnidGestora
     *
     * @return string
     */
    public function getNomeUnidGestora()
    {
        return $this->nomeUnidGestora;
    }

    /**
     * Sets a new nomeUnidGestora
     *
     * @param string $nomeUnidGestora
     * @return self
     */
    public function setNomeUnidGestora($nomeUnidGestora)
    {
        $this->nomeUnidGestora = $nomeUnidGestora;
        return $this;
    }

    /**
     * Gets as cpfResponsavel
     *
     * @return string
     */
    public function getCpfResponsavel()
    {
        return $this->cpfResponsavel;
    }

    /**
     * Sets a new cpfResponsavel
     *
     * @param string $cpfResponsavel
     * @return self
     */
    public function setCpfResponsavel($cpfResponsavel)
    {
        $this->cpfResponsavel = $cpfResponsavel;
        return $this;
    }

    /**
     * Gets as cpfGestor
     *
     * @return string
     */
    public function getCpfGestor()
    {
        return $this->cpfGestor;
    }

    /**
     * Sets a new cpfGestor
     *
     * @param string $cpfGestor
     * @return self
     */
    public function setCpfGestor($cpfGestor)
    {
        $this->cpfGestor = $cpfGestor;
        return $this;
    }

    /**
     * Gets as anoReferencia
     *
     * @return int
     */
    public function getAnoReferencia()
    {
        return $this->anoReferencia;
    }

    /**
     * Sets a new anoReferencia
     *
     * @param int $anoReferencia
     * @return self
     */
    public function setAnoReferencia($anoReferencia)
    {
        $this->anoReferencia = $anoReferencia;
        return $this;
    }

    /**
     * Gets as mesReferencia
     *
     * @return int
     */
    public function getMesReferencia()
    {
        return $this->mesReferencia;
    }

    /**
     * Sets a new mesReferencia
     *
     * @param int $mesReferencia
     * @return self
     */
    public function setMesReferencia($mesReferencia)
    {
        $this->mesReferencia = $mesReferencia;
        return $this;
    }

    /**
     * Gets as versaoXml
     *
     * @return int
     */
    public function getVersaoXml()
    {
        return $this->versaoXml;
    }

    /**
     * Sets a new versaoXml
     *
     * @param int $versaoXml
     * @return self
     */
    public function setVersaoXml($versaoXml)
    {
        $this->versaoXml = $versaoXml;
        return $this;
    }

    /**
     * Gets as diaInicPresContas
     *
     * @return int
     */
    public function getDiaInicPresContas()
    {
        return $this->diaInicPresContas;
    }

    /**
     * Sets a new diaInicPresContas
     *
     * @param int $diaInicPresContas
     * @return self
     */
    public function setDiaInicPresContas($diaInicPresContas)
    {
        $this->diaInicPresContas = $diaInicPresContas;
        return $this;
    }

    /**
     * Gets as diaFinaPresContas
     *
     * @return int
     */
    public function getDiaFinaPresContas()
    {
        return $this->diaFinaPresContas;
    }

    /**
     * Sets a new diaFinaPresContas
     *
     * @param int $diaFinaPresContas
     * @return self
     */
    public function setDiaFinaPresContas($diaFinaPresContas)
    {
        $this->diaFinaPresContas = $diaFinaPresContas;
        return $this;
    }


}

