export const javaPixCode = `
@Service
@RequiredArgsConstructor
public class PixPaymentService implements PaymentService {

    private final PixGateway pixGateway;
    private final PaymentRepository paymentRepository;
    private final NotificationService notificationService;

    @Transactional
    @Override
    public Payment processPayment(PaymentRequest request) {
        validatePixRequest(request);

        Payment payment = Payment.builder()
            .amount(request.getAmount())
            .payerKey(request.getPayerKey())
            .receiverKey(request.getReceiverKey())
            .status(PaymentStatus.PENDING)
            .build();

        paymentRepository.save(payment);

        try {
            PixResponse response = pixGateway.createPixCharge(
                new PixChargeRequest(
                    request.getAmount(),
                    request.getReceiverKey(),
                    UUID.randomUUID().toString()
                )
            );

            payment.setPixCode(response.getPixCode());
            payment.setExpirationDate(response.getExpirationDate());
            payment.setStatus(PaymentStatus.PENDING_CONFIRMATION);

            // Agenda verificação automática
            schedulePaymentConfirmation(payment.getId());

        } catch (PixGatewayException e) {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureReason(e.getMessage());
            throw e;
        }

        return paymentRepository.save(payment);
    }

    private void validatePixRequest(PaymentRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException("Valor deve ser positivo");
        }
        if (!request.getReceiverKey().matches("[a-zA-Z0-9@._-]+")) {
            throw new IllegalArgumentException("Chave Pix inválida");
        }
    }
}`;

export const nodeAuthCode = `
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const router = express.Router()
const User = require('../models/User')

// @route   POST api/auth/register
// @desc    Registrar usuário
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor inclua um email válido').isEmail(),
    check(
      'password',
      'Por favor insira uma senha com 6 ou mais caracteres'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // Verifica se usuário já existe
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: 'Usuário já existe' })
      }

      user = new User({
        name,
        email,
        password
      })

      // Criptografa senha
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      // Retorna JWT
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Erro do servidor')
    }
  }
)

// @route   POST api/auth/login
// @desc    Autenticar usuário & obter token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Por favor inclua um email válido').isEmail(),
    check('password', 'Senha é obrigatória').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'Credenciais inválidas' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciais inválidas' })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Erro do servidor')
    }
  }
)

module.exports = router
`;

export const reactDashboardCode = `
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Line } from 'react-chartjs-2'
import { Card } from './Card'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const socket = io(API_URL)

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    users: 0,
    payments: 0,
    revenue: 0
  })
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Revenue (Últimas 24h)',
      data: [],
      borderColor: 'rgba(105, 89, 205, 1)',
      backgroundColor: 'rgba(105, 89, 205, 0.1)',
      tension: 0.3
    }]
  })

  useEffect(() => {
    // Carrega métricas iniciais
    fetchMetrics()

    // Escuta atualizações em tempo real via WebSocket
    socket.on('metricsUpdate', (data) => {
      setMetrics(prev => ({
        ...prev,
        ...data
      }))

      // Atualiza gráfico
      setChartData(prev => ({
        labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-20),
        datasets: [{
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, data.revenue].slice(-20)
        }]
      }))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const fetchMetrics = async () => {
    try {
      const res = await fetch(\`\${API_URL}/api/metrics\`)
      const data = await res.json()
      setMetrics(data)
    } catch (err) {
      console.error('Erro ao buscar métricas:', err)
    }
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Painel Administrativo</h1>

      <div className="metrics-grid">
        <Card title="Usuários Ativos" value={metrics.users} icon="users" />
        <Card title="Pagamentos Processados" value={metrics.payments} icon="credit-card" />
        <Card title="Revenue (USD)" value={'$' + metrics.revenue.toFixed(2)} icon="dollar-sign" />
      </div>

      <div className="chart-container">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Revenue em Tempo Real' }
            },
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>
    </div>
  )
}
`;
