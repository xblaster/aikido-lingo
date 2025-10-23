/**
 * Home Page
 * Main navigation with belt progression and unit cards
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  Grid,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  ButtonBase,
  Paper,
  Button,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useTheme } from '@mui/material/styles';
import { useProgress } from '../contexts/ProgressContext'
import { aikidoCurriculum } from '../data/curriculum'
import { pageVariants, staggerContainer, staggerItem, cardHover } from '../utils/animations'

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const { progress, isUnitUnlocked, isUnitCompleted } = useProgress()
  const [expandedBelt, setExpandedBelt] = React.useState<string | false>('white_5_belt')
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  const allUnits = React.useMemo(() => (
    aikidoCurriculum.belts.flatMap(belt =>
      belt.units.map(unit => ({ belt, unit }))
    )
  ), [])

  const nextUnitEntry = React.useMemo(() => (
    allUnits.find(({ unit }) => isUnitUnlocked(unit.id) && !isUnitCompleted(unit.id)) || null
  ), [allUnits, isUnitUnlocked, isUnitCompleted])

  const lastSession = React.useMemo(() => {
    if (!progress.practiceLog.length) return null
    const sortedLog = [...progress.practiceLog].sort((a, b) => (
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ))
    return sortedLog[0]
  }, [progress.practiceLog])

  const dueReviews = React.useMemo(() => {
    const boxes = progress.spacedRepetitionData?.boxes || {}
    const now = Date.now()
    return Object.values(boxes).filter(entry => {
      if (!entry?.nextReview) return false
      const nextReviewTime = new Date(entry.nextReview).getTime()
      return !Number.isNaN(nextReviewTime) && nextReviewTime <= now
    }).length
  }, [progress.spacedRepetitionData])

  const formatRelativeTime = React.useCallback((dateString: string) => {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return ''

    const diffMs = Date.now() - date.getTime()
    const minutes = Math.round(diffMs / 60000)
    if (minutes <= 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`

    const hours = Math.round(minutes / 60)
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`

    const days = Math.round(hours / 24)
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`

    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date)
  }, [])

  // Scroll listener for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBelt = (beltId: string) => {
    const element = document.getElementById(`belt-${beltId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setExpandedBelt(beltId)
    }
  }

  const handleAccordionChange = (beltId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedBelt(isExpanded ? beltId : false)
  }

  const handleUnitClick = (unitId: string) => {
    if (isUnitUnlocked(unitId)) {
      navigate(`/unit/${unitId}`)
    }
  }

  const getUnitStatus = (unitId: string) => {
    if (isUnitCompleted(unitId)) return 'completed'
    if (isUnitUnlocked(unitId)) return 'unlocked'
    return 'locked'
  }

  const getBeltProgress = (beltId: string) => {
    const belt = aikidoCurriculum.belts.find(b => b.id === beltId)
    if (!belt) return 0
    const completedUnits = belt.units.filter(u => isUnitCompleted(u.id)).length
    const totalUnits = belt.units.length
    return Math.round((completedUnits / totalUnits) * 100)
  }

  const totalCompletedUnits = progress.completedUnits.length
  const totalUnitsInCurriculum = aikidoCurriculum.belts.reduce((sum, belt) => sum + belt.units.length, 0)
  const overallProgress = Math.round((totalCompletedUnits / totalUnitsInCurriculum) * 100)

  return (
    <Box
      component={motion.div}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ minHeight: '100vh', py: 4 }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ mb: 4, textAlign: 'center' }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.light' }}>
            🥋 Aikido Lingo
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Maîtrisez la terminologie de l'aïkido
          </Typography>
        </Box>

        {/* Resume Card */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          sx={{ mb: 4 }}
        >
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: '18px',
              background: theme.custom.gradients.glass,
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: theme.custom.shadows.lg,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1, fontWeight: 600 }}>
                  Votre prochaine étape
                </Typography>
                {nextUnitEntry ? (
                  <>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                      {nextUnitEntry.unit.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, mb: 2 }}>
                      {nextUnitEntry.unit.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: { xs: 2, md: 0 } }}>
                      <Chip
                        label={nextUnitEntry.belt.name}
                        size="small"
                        sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        variant="outlined"
                      />
                      <Chip
                        label={`${nextUnitEntry.unit.terminology.length} termes`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${nextUnitEntry.unit.exercises.length} exercices`}
                        size="small"
                        variant="outlined"
                      />
                      {dueReviews > 0 && (
                        <Chip
                          label={`${dueReviews} révision${dueReviews > 1 ? 's' : ''} à revoir`}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                      Bravo, toutes les unités sont terminées !
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, mb: 2 }}>
                      Continuez à entretenir vos connaissances avec les révisions espacées et partagez vos acquis avec votre dojo.
                    </Typography>
                    {dueReviews > 0 && (
                      <Chip
                        label={`${dueReviews} révision${dueReviews > 1 ? 's' : ''} à revoir`}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrowIcon />}
                    onClick={() => nextUnitEntry && handleUnitClick(nextUnitEntry.unit.id)}
                    disabled={!nextUnitEntry}
                    sx={{
                      py: 1.5,
                      background: theme.custom.gradients.primary,
                      boxShadow: theme.custom.shadows.primaryGlow,
                    }}
                  >
                    {nextUnitEntry ? 'Reprendre cette unité' : 'Explorer les unités'}
                  </Button>
                  <Box sx={{
                    p: 2,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Activité récente
                    </Typography>
                    {lastSession ? (
                      <>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatRelativeTime(lastSession.date)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Score {lastSession.score}% · {lastSession.exercisesCompleted} exercices · {lastSession.duration} min
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Lancez votre première session pour voir votre progression ici.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Quick Navigation to Belts */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1.5, ml: 1 }}>
            Navigation rapide
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {aikidoCurriculum.belts.map((belt) => {
              const beltProgress = getBeltProgress(belt.id)
              const beltCompleted = belt.units.every(u => isUnitCompleted(u.id))

              return (
                <ButtonBase
                  key={belt.id}
                  onClick={() => scrollToBelt(belt.id)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    background: expandedBelt === belt.id
                      ? `linear-gradient(135deg, rgba(38, 166, 154, 0.2), rgba(38, 166, 154, 0.1))`
                      : `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
                    border: expandedBelt === belt.id
                      ? '1px solid rgba(38, 166, 154, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(135deg, rgba(38, 166, 154, 0.15), rgba(38, 166, 154, 0.05))`,
                      border: '1px solid rgba(38, 166, 154, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: belt.color,
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {belt.name.split(' - ')[0]}
                    </Typography>
                    {beltCompleted && <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />}
                    <Typography variant="caption" color="text.secondary">
                      {beltProgress}%
                    </Typography>
                  </Box>
                </ButtonBase>
              )
            })}
          </Box>
        </Box>

        {/* User Stats Card (Glassmorphism) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '16px',
            background: theme.custom.gradients.glass,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: theme.custom.shadows.lg,
            '&:hover': {
              boxShadow: theme.custom.shadows.primaryGlow,
            },
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Progression Globale
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {totalCompletedUnits} / {totalUnitsInCurriculum} unités complétées
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={overallProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: theme.custom.gradients.primary,
                        boxShadow: theme.custom.glows.primary,
                        borderRadius: 6,
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: theme.custom.gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {overallProgress}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.totalXp}
                  </Typography>
                  <Typography variant="caption">Total XP</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.accuracy}%
                  </Typography>
                  <Typography variant="caption">Précision</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.streak} 🔥
                  </Typography>
                  <Typography variant="caption">Série</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Belt Sections with Units (Accordion) */}
        {aikidoCurriculum.belts.map((belt, beltIndex) => {
          const beltProgress = getBeltProgress(belt.id)
          const beltCompleted = belt.units.every(u => isUnitCompleted(u.id))

          return (
            <Box
              key={belt.id}
              id={`belt-${belt.id}`}
              sx={{ mb: 2, scrollMarginTop: '20px' }}
            >
              <Accordion
                expanded={expandedBelt === belt.id}
                onChange={handleAccordionChange(belt.id)}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: beltIndex * 0.1 }}
                sx={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
                  border: beltCompleted
                    ? '2px solid rgba(102, 187, 106, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: beltCompleted ? theme.custom.shadows.successGlow : theme.custom.shadows.md,
                  borderRadius: '12px !important',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: '0 0 16px 0',
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: beltCompleted
                      ? theme.custom.shadows.successGlow
                      : theme.custom.shadows.primaryGlow,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />}
                  sx={{
                    p: 3,
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(38, 166, 154, 0.05)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', pr: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {belt.name}
                        </Typography>
                        {beltCompleted && <CheckCircleIcon sx={{ color: 'success.main', fontSize: 28 }} />}
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {belt.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Chip
                          label={`${belt.units.length} unité${belt.units.length > 1 ? 's' : ''}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={`${belt.units.filter(u => isUnitCompleted(u.id)).length} complétée${belt.units.filter(u => isUnitCompleted(u.id)).length > 1 ? 's' : ''}`}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        border: `4px solid ${belt.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        bgcolor: 'rgba(0,0,0,0.2)',
                        boxShadow: `0 0 20px ${belt.color}40`,
                      }}
                    >
                      {beltProgress}
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', mt: -0.5 }}>
                        %
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 3, pt: 0 }}>
                  {/* Progress Bar */}
                  <Box sx={{ mb: 3 }}>
                    <LinearProgress
                      variant="determinate"
                      value={beltProgress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                        '& .MuiLinearProgress-bar': {
                          background: beltCompleted
                            ? theme.custom.gradients.success
                            : theme.custom.gradients.primary,
                          borderRadius: 5,
                          boxShadow: beltCompleted ? theme.custom.glows.success : theme.custom.glows.primary,
                        },
                      }}
                    />
                  </Box>

                  {/* Units Grid */}
                  <Grid
                    container
                    spacing={3}
                    component={motion.div}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                {belt.units.map((unit, index) => {
                  const status = getUnitStatus(unit.id)
                  const isLocked = status === 'locked'
                  const isComplete = status === 'completed'

                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      key={unit.id}
                      component={motion.div}
                      variants={staggerItem}
                    >
                      <Card
                        component={motion.div}
                        variants={isLocked ? undefined : cardHover}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        sx={{
                          height: '100%',
                          opacity: isLocked ? 0.5 : 1,
                          background: isComplete
                            ? `linear-gradient(145deg, rgba(102, 187, 106, 0.15), rgba(22, 22, 22, 0.3))`
                            : `linear-gradient(145deg, ${theme.palette.background.paper}, rgba(26, 42, 58, 0.4))`,
                          border: isComplete
                            ? '1px solid rgba(102, 187, 106, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.05)',
                          boxShadow: theme.custom.shadows.md,
                          transition: 'all 0.3s ease',
                          '&:hover': !isLocked
                            ? {
                                boxShadow: isComplete
                                  ? theme.custom.shadows.successGlow
                                  : theme.custom.shadows.primaryGlow,
                                border: isComplete
                                  ? '1px solid rgba(102, 187, 106, 0.5)'
                                  : '1px solid rgba(38, 166, 154, 0.3)',
                              }
                            : {},
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleUnitClick(unit.id)}
                          disabled={isLocked}
                          sx={{ height: '100%', p: 3 }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Chip
                              label={`Unité ${index + 1}`}
                              size="small"
                              color="primary"
                            />
                            {isComplete ? (
                              <CheckCircleIcon sx={{ color: 'success.main' }} />
                            ) : isLocked ? (
                              <LockIcon />
                            ) : (
                              <PlayArrowIcon color="primary" />
                            )}
                          </Box>

                          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, my: 2 }}>
                            {unit.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                            {unit.description}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                              label={`${unit.terminology.length} termes`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`${unit.exercises.length} exercices`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`~${unit.estimatedTime} min`}
                              size="small"
                              variant="outlined"
                            />
                            {unit.isSafetyCritical && (
                              <Chip
                                label="⚠️ Sécurité"
                                size="small"
                                color="warning"
                                variant="filled"
                              />
                            )}
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Fab
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000,
              background: theme.custom.gradients.primary,
              boxShadow: theme.custom.shadows.primaryGlow,
              '&:hover': {
                boxShadow: theme.custom.shadows.primaryGlow,
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        )}

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Développé avec ❤️ pour les pratiquants d'aïkido
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default HomePage
