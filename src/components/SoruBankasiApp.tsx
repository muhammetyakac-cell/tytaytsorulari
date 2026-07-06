"use client";
import React, { useState, useEffect } from 'react';
import KatexContent from '@/components/KatexContent';

const INITIAL_QUESTIONS = [
  {
    id: 1,
    exam: 'TYT',
    subject: 'Matematik',
    topic: 'Sayılar ve Temel Kavramlar',
    difficulty: 'Orta',
    questionText: 'a, b ve c sıfırdan ve birbirinden farklı birer rakam olmak üzere, ondalık gösterimleri \nK = a,b \nL = b,c \nM = c,a \nbiçiminde olan üç sayı veriliyor. Ondalık gösterimi verilen sayılarda sıralama konusunu yanlış öğrenen bir öğrenci, bu üç sayının sıralamasının birler basamağı yerine onda birler basamağındaki değerlerin büyüklüğüne göre yapılacağını düşünerek L < K < M sıralamasını elde ediyor. Buna göre, bu sayıların doğru sıralaması aşağıdakilerden hangisidir?',
    options: {
      A: 'K < L < M',
      B: 'L < M < K',
      C: 'M < K < L',
      D: 'M < L < K',
      E: 'K < M < L'
    },
    correctAnswer: 'B',
    solution: 'Öğrenci onda birler basamağına göre sıralama yaptığı için b, a ve c sayılarını sıralamıştır. L < K < M sıralamasına göre, onda birler basamağındaki rakamlar sırasıyla c, b ve a dır. Buradan c < b < a olduğu anlaşılır. Doğru sıralama ise birler basamağındaki rakamlara (yani sırasıyla b, c ve a) bakılarak yapılmalıdır. c < b < a olduğuna göre birler basamaklarını karşılaştırırsak: L (birler basamağı b), M (birler basamağı c), K (birler basamağı a). Dolayısıyla en küçük M (c), sonra L (b), en büyük ise K (a) olur. Doğru sıralama L < M < K şeklindedir.',
    author: 'ÖSYM Tarzı',
    likes: 128
  },
  {
    id: 2,
    exam: 'TYT',
    subject: 'Türkçe',
    topic: 'Paragrafta Anlam',
    difficulty: 'Zor',
    questionText: 'Bir sanatçının kendi dünyasını dışa vururken kullandığı dil, yalnızca kelimelerden ibaret değildir. O, sessizliğin sesini de eserine işleyebilir. Bu sessizlik, bazen bir fırça darbesindeki boşlukta, bazen de bir romandaki iki paragraf arasındaki derin boşlukta kendini hissettirir. Okur, bu boşlukları kendi hayal gücüyle doldurduğu ölçüde esere dahil olur ve onun gerçek yaratıcılarından biri haline gelir.\n\nBu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?',
    options: {
      A: 'Sanat eserlerindeki boşlukların eserin estetik değerini düşürdüğü',
      B: 'Sanatçının başarısının, kullandığı kelime sayısının zenginliğine bağlı olduğu',
      C: 'Eserlerdeki örtük alanların okurun katılımını sağlayarak eseri zenginleştirdiği',
      D: 'Okurun bir eseri anlamak için sanatçının hayatını bilmesi gerektiği',
      E: 'Her sanat dalının kendine özgü bir anlatım dili geliştirmesi gerektiği'
    },
    correctAnswer: 'C',
    solution: 'Parçada sanatçının eserlerinde bıraktığı "sessizlikler" ve "boşluklar" sayesinde okurun bu alanları kendi hayal gücüyle doldurarak esere dahil olduğu ve onun yaratıcılarından biri haline geldiği vurgulanmaktadır. Bu durum C seçeneğindeki "Eserlerdeki örtük alanların okurun katılımını sağlayarak eseri zenginleştirdiği" ifadesiyle doğrudan uyuşmaktadır.',
    author: 'Türkçe Editörü',
    likes: 94
  },
  {
    id: 3,
    exam: 'AYT',
    subject: 'Matematik',
    topic: 'Türev ve Uygulamaları',
    difficulty: 'Zor',
    questionText: 'f(x) = x³ - 3x² + k fonksiyonunun yerel ekstremum noktalarının koordinatları çarpımı sıfır olduğuna göre, k sayısının alabileceği değerler toplamı kaçtır?',
    options: {
      A: '-4',
      B: '0',
      C: '4',
      D: '8',
      E: '12'
    },
    correctAnswer: 'C',
    solution: 'İlk olarak f\'(x) = 3x² - 6x = 3x(x - 2) türevini buluruz. Türevin kökleri x = 0 ve x = 2 dir. Bu noktalar yerel ekstremum noktalarının apsisleridir.\n1) x = 0 için yerel maksimum değeri f(0) = k dır.\n2) x = 2 için yerel minimum değeri f(2) = 2³ - 3(2)² + k = 8 - 12 + k = k - 4 tür.\nEkstremum değerlerinin (koordinatları çarpımı) f(0) * f(2) = 0 olduğu verilmiştir.\nk * (k - 4) = 0 eşitliğinden k = 0 veya k = 4 bulunur.\nDeğerler toplamı: 0 + 4 = 4 olur.',
    author: 'AYT Komisyonu',
    likes: 156
  },
  {
    id: 4,
    exam: 'AYT',
    subject: 'Fizik',
    topic: 'Modern Fizik',
    difficulty: 'Orta',
    questionText: 'Fotoelektrik olayda, metal bir yüzeye düşürülen ışığın frekansı artırıldığında, metalden sökülen elektronlarla ilgili;\nI. Maksimum kinetik enerjileri artar.\nII. Metalden sökülme süreleri kısalır.\nIII. Oluşan fotoelektrik akımının maksimum değeri artar.\nyargılarından hangileri kesinlikle doğrudur?',
    options: {
      A: 'Yalnız I',
      B: 'Yalnız II',
      C: 'I ve II',
      D: 'I ve III',
      E: 'I, II ve III'
    },
    correctAnswer: 'A',
    solution: 'Einstein\'ın fotoelektrik denklemine göre: E_fotan = E_bağlanma + E_kinetik. Işığın frekansı (f) artarsa, enerjisi (E=h.f) artar. Metal aynı kalacağı için bağlanma enerjisi sabittir. Bu durumda kopan elektronların maksimum kinetik enerjisi kesinlikle artar (I doğru). Sökülme süresi anlıktır, frekansa bağlı değildir (II yanlış). Akımın maksimum değeri ışık şiddetine (foton sayısına) bağlıdır, frekansa değil (III kesin değil).',
    author: 'Fizik Zümresi',
    likes: 85
  },
  {
    id: 5,
    exam: 'TYT',
    subject: 'Fen Bilimleri',
    topic: 'Kimya - Asitler ve Bazlar',
    difficulty: 'Kolay',
    questionText: 'Oda sıcaklığında sulu çözeltilerle ilgili yapılan deneylerde aşağıdaki bulgular elde edilmiştir:\n- X çözeltisi mavi turnusol kağıdını kırmızıya çevirmektedir.\n- Y çözeltisi çinko (Zn) metali ile tepkimeye girdiğinde H₂ gazı açığa çıkarmaktadır.\n- Z çözeltisinin pH değeri 11\'dir.\nBuna göre X, Y ve Z çözeltilerinin sınıflandırılması aşağıdakilerden hangisinde doğru verilmiştir?',
    options: {
      A: 'X: Asit, Y: Asit, Z: Baz',
      B: 'X: Baz, Y: Asit, Z: Asit',
      C: 'X: Asit, Y: Baz, Z: Baz',
      D: 'X: Baz, Y: Baz, Z: Asit',
      E: 'X: Asit, Y: Asit, Z: Asit'
    },
    correctAnswer: 'A',
    solution: 'Mavi turnusolü kırmızıya çeviren çözeltiler asidiktir (X asit). Metallerle (özellikle çinko gibi aktif veya amfoter metallerle) tepkimeye girip H2 gazı çıkaranlar asit çözeltileridir (Y asit). pH değeri 7\'den büyük olanlar baziktir (Z baz). Bu nedenle doğru şık A seçeneğidir.',
    author: 'Kimya Bilimi',
    likes: 62
  }
];

export default function App({ initialQuestions = null }: { initialQuestions?: any[] | null }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [questions, setQuestions] = useState(initialQuestions && initialQuestions.length > 0 ? initialQuestions : INITIAL_QUESTIONS);
  const [savedQuestions, setSavedQuestions] = useState([1, 3]); // default saved question ids
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('Hepsi');
  const [selectedSubject, setSelectedSubject] = useState('Hepsi');
  const [darkMode, setDarkMode] = useState(false);

  // Active quiz state
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [quizMode, setQuizMode] = useState('study'); // 'study' (instant show) or 'exam' (timed/test)
  const [selectedAnswers, setSelectedAnswers] = useState({}); // {questionId: option}
  const [showSolutionId, setShowSolutionId] = useState(null);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [examTimer, setExamTimer] = useState(300); // 5 minutes timer
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  // Stats
  const [solvedStats, setSolvedStats] = useState({ correct: 18, wrong: 4 });

  // Custom question form state
  const [newQuestion, setNewQuestion] = useState({
    exam: 'TYT',
    subject: 'Matematik',
    topic: '',
    difficulty: 'Orta',
    questionText: '',
    A: '', B: '', C: '', D: '', E: '',
    correctAnswer: 'A',
    solution: '',
    author: ''
  });

  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Timer simulation for Exam Mode
  useEffect(() => {
    let interval;
    if (activeQuizId && quizMode === 'exam' && examTimer > 0 && !isExamSubmitted) {
      interval = setInterval(() => {
        setExamTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsExamSubmitted(true);
            triggerNotification('Süre doldu! Sınavınız otomatik olarak tamamlandı.', 'warning');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeQuizId, quizMode, examTimer, isExamSubmitted]);

  // Dark mode class handler
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const subjectsList = ['Hepsi', 'Matematik', 'Türkçe', 'Fizik', 'Fen Bilimleri', 'Sosyal Bilimler', 'Geometri', 'Kimya', 'Biyoloji'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = selectedExam === 'Hepsi' || q.exam === selectedExam;
    const matchesSubject = selectedSubject === 'Hepsi' || q.subject === selectedSubject;
    return matchesSearch && matchesExam && matchesSubject;
  });

  const toggleSaveQuestion = (id) => {
    if (savedQuestions.includes(id)) {
      setSavedQuestions(savedQuestions.filter(qId => qId !== id));
      triggerNotification('Soru kaydedilenlerden çıkarıldı.', 'info');
    } else {
      setSavedQuestions([...savedQuestions, id]);
      triggerNotification('Soru başarıyla kaydedildi!', 'success');
    }
  };

  const handleAnswerSelect = (questionId, option) => {
    if (isExamSubmitted && quizMode === 'exam') return; // cannot change in submitted exam
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));

    if (quizMode === 'study') {
      const q = questions.find(item => item.id === questionId);
      if (option === q.correctAnswer) {
        setSolvedStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        triggerNotification('Tebrikler! Doğru cevap.', 'success');
      } else {
        setSolvedStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        triggerNotification('Yanlış cevap, çözümü inceleyebilirsin.', 'error');
      }
    }
  };

  const startExamMode = () => {
    if (filteredQuestions.length === 0) {
      triggerNotification('Lütfen sınav başlatmak için soru kriterlerini değiştirin.', 'error');
      return;
    }
    setActiveQuizId('custom-exam');
    setQuizMode('exam');
    setExamTimer(filteredQuestions.length * 120); // 2 minutes per question
    setSelectedAnswers({});
    setIsExamSubmitted(false);
    setShowSolutionId(null);
    triggerNotification('Sınav modu başlatıldı! Süreniz başladı.', 'info');
  };

  const submitExam = () => {
    setIsExamSubmitted(true);
    let correctCount = 0;
    let wrongCount = 0;
    filteredQuestions.forEach(q => {
      const userAns = selectedAnswers[q.id];
      if (userAns) {
        if (userAns === q.correctAnswer) correctCount++;
        else wrongCount++;
      }
    });
    setSolvedStats(prev => ({
      correct: prev.correct + correctCount,
      wrong: prev.wrong + wrongCount
    }));
    triggerNotification(`Sınav bitti! ${correctCount} Doğru, ${wrongCount} Yanlış.`, 'success');
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.questionText || !newQuestion.A || !newQuestion.B || !newQuestion.solution) {
      triggerNotification('Lütfen soru metni, şıklar ve çözüm alanlarını doldurun.', 'error');
      return;
    }

    const created = {
      id: Date.now(),
      exam: newQuestion.exam,
      subject: newQuestion.subject,
      topic: newQuestion.topic || 'Genel',
      difficulty: newQuestion.difficulty,
      questionText: newQuestion.questionText,
      options: {
        A: newQuestion.A,
        B: newQuestion.B,
        C: newQuestion.C || 'Boş Şık',
        D: newQuestion.D || 'Boş Şık',
        E: newQuestion.E || 'Boş Şık'
      },
      correctAnswer: newQuestion.correctAnswer,
      solution: newQuestion.solution,
      author: newQuestion.author || 'Ziyaretçi',
      likes: 0
    };

    setQuestions([created, ...questions]);
    triggerNotification('Sorunuz sisteme eklendi ve havuzda yayına alındı!', 'success');
    
    // reset form
    setNewQuestion({
      exam: 'TYT',
      subject: 'Matematik',
      topic: '',
      difficulty: 'Orta',
      questionText: '',
      A: '', B: '', C: '', D: '', E: '',
      correctAnswer: 'A',
      solution: '',
      author: ''
    });
    setActiveTab('exams');
  };

  const handleLike = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, likes: q.likes + 1 } : q));
    triggerNotification('Soru beğenildi!', 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Premium Navigation Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
              🎴
            </div>
            <div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                tytaytsorulari
              </span>
              <span className="text-xs block font-bold tracking-widest text-slate-500">SORU BANKASI</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => { setActiveTab('dashboard'); setActiveQuizId(null); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-500'}`}
            >
              📊 Panelim
            </button>
            <button 
              onClick={() => { setActiveTab('exams'); setActiveQuizId(null); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'exams' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-500'}`}
            >
              📝 Soru Çöz
            </button>
            <button 
              onClick={() => { setActiveTab('saved'); setActiveQuizId(null); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'saved' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-500'}`}
            >
              ⭐ Kaydedilenler ({savedQuestions.length})
            </button>
            <button 
              onClick={() => { setActiveTab('add-question'); setActiveQuizId(null); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'add-question' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-500'}`}
            >
              ➕ Soru Gönder
            </button>
          </nav>

          {/* Right Header Panel (Dark Mode toggle, user stats) */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-500 transition-colors"
              title="Koyu/Açık Tema"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Netin: {(solvedStats.correct - (solvedStats.wrong / 4)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </header>

      {}
      {notification && (
        <div className="fixed top-20 right-4 z-50 flex items-center p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 animate-bounce max-w-sm">
          <div className="mr-3 text-xl">
            {notification.type === 'success' && '✅'}
            {notification.type === 'error' && '❌'}
            {notification.type === 'info' && 'ℹ️'}
            {notification.type === 'warning' && '⚠️'}
          </div>
          <div className="text-sm font-semibold">{notification.message}</div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Beautiful Welcome Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-8 md:p-12 shadow-xl">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <span className="text-9xl font-black">TYT AYT</span>
              </div>
              <div className="max-w-xl space-y-4">
                <span className="bg-indigo-500/30 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">YKS Hazırlık Platformu</span>
                <h1 className="text-3xl md:text-5xl font-black leading-tight">Sınav Yolculuğunda En Sağlam Adımlarla İlerle!</h1>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                  Özenle seçilmiş ve tamamen ÖSYM formatına uygun binlerce TYT-AYT sorusunu çöz, detaylı video kalitesindeki açıklamaları incele ve sınav hızını test et.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => { setActiveTab('exams'); setSelectedExam('TYT'); }}
                    className="bg-white text-indigo-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    🚀 TYT Soruları
                  </button>
                  <button 
                    onClick={() => { setActiveTab('exams'); setSelectedExam('AYT'); }}
                    className="bg-purple-600/80 hover:bg-purple-600 text-white border border-purple-400/40 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    ⭐ AYT Soruları
                  </button>
                </div>
              </div>
            </div>

            {/* Live Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Çözülen Soru</span>
                  <p className="text-2xl font-black">{solvedStats.correct + solvedStats.wrong}</p>
                  <span className="text-[11px] text-emerald-500 font-semibold">Tüm dönem boyunca</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-xl">📝</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Doğruluk Oranı</span>
                  <p className="text-2xl font-black">
                    {solvedStats.correct + solvedStats.wrong > 0 
                      ? `${Math.round((solvedStats.correct / (solvedStats.correct + solvedStats.wrong)) * 100)}%` 
                      : '0%'}
                  </p>
                  <span className="text-[11px] text-indigo-500 font-semibold">Net Başarı Oranı</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-xl">🎯</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sınava Kalan Gün</span>
                  <p className="text-2xl font-black">348 Gün</p>
                  <span className="text-[11px] text-pink-500 font-semibold">YKS Sayaç (Tahmini)</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center text-xl">⏰</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Eklediğin Sorular</span>
                  <p className="text-2xl font-black">{questions.length - INITIAL_QUESTIONS.length}</p>
                  <span className="text-[11px] text-amber-500 font-semibold">Topluluk katkısı</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-xl">💡</div>
              </div>
            </div>

            {/* Main Dashboard Layout (Split Column) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Question of the Day & Activity */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Daily Question */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">Günün Sorusu</span>
                      <span className="text-xs font-bold text-slate-500">TYT - Matematik</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Beğeni: 128 ❤️</span>
                  </div>

                    <div className="font-semibold text-sm md:text-base leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-100">
                      <KatexContent text={questions[0].questionText} as="div" />
                    </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => { setActiveTab('exams'); setSelectedSubject('Matematik'); }}
                      className="w-full py-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold text-sm transition-all border border-slate-200/50 dark:border-slate-800"
                    >
                      Soruyu Detaylı İncele ve Çöz &rarr;
                    </button>
                  </div>
                </div>

                {/* Topluluk Liderlik Tablosu & Çalışma Önerileri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Leaderboard simulation */}
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">🏆 Haftalık Liderler</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">1</span>
                          <span className="text-sm font-semibold">Kerem Öztürk</span>
                        </div>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md font-bold">485 Net</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-slate-400 text-white font-bold text-xs flex items-center justify-center">2</span>
                          <span className="text-sm font-semibold">Zeynep S.</span>
                        </div>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md font-bold">472 Net</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">3</span>
                          <span className="text-sm font-semibold">Ali Yılmaz</span>
                        </div>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md font-bold">460 Net</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats & custom progress */}
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">🎯 Günlük Hedef</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Hedef: 50 Soru</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{(solvedStats.correct + solvedStats.wrong)} / 50</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
                          style={{ width: `${Math.min(100, ((solvedStats.correct + solvedStats.wrong) / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 pt-1 leading-relaxed">Sınava yaklaştıkça her gün çözdüğün soru adedini artırmak netlerini doğrudan etkileyecektir. Bugün harika gidiyorsun!</p>
                    </div>
                  </div>
                </div>

              </div>

              {}
              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Quick Filters card */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">⚡ Hızlı Başlangıç</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => { setActiveTab('exams'); setSelectedExam('Hepsi'); setSelectedSubject('Matematik'); }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/40 dark:hover:bg-indigo-950/20 flex items-center justify-between transition-colors group"
                    >
                      <span className="text-sm font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">📐 TYT-AYT Matematik</span>
                      <span className="text-xs text-slate-500">&rarr;</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('exams'); setSelectedExam('Hepsi'); setSelectedSubject('Türkçe'); }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/40 dark:hover:bg-indigo-950/20 flex items-center justify-between transition-colors group"
                    >
                      <span className="text-sm font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">📝 Türkçe Paragraf</span>
                      <span className="text-xs text-slate-500">&rarr;</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('exams'); setSelectedExam('Hepsi'); setSelectedSubject('Fizik'); }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/40 dark:hover:bg-indigo-950/20 flex items-center justify-between transition-colors group"
                    >
                      <span className="text-sm font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">⚡ AYT Fizik Kampı</span>
                      <span className="text-xs text-slate-500">&rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Motivational Quote Cards */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
                  <span className="absolute -right-3 -top-3 text-7xl opacity-10">💡</span>
                  <div className="space-y-3 relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Motivasyon</span>
                    <p className="font-semibold italic text-sm leading-relaxed">
                      "Gelecek, bugünden ona hazırlananlarındır."
                    </p>
                    <p className="text-xs text-indigo-200 text-right">- Malcolm X</p>
                  </div>
                </div>

                {/* Resource Info */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm">💡 Öğrenme İpucu</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sınav modunda yanlış çözdüğün soruları daha sonra <strong>Kaydedilenler</strong> sekmesinden tek tıkla tekrar gözden geçirmeyi unutma. Hatalar en iyi öğretmenlerdir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'exams' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter Hub Panel */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black">YKS Soru Havuzu</h2>
                  <p className="text-xs text-slate-500">Hızlıca ders, konu veya sınav türü belirleyerek soru çözmeye başla.</p>
                </div>
                
                {/* Quick exam tab triggers */}
                <div className="flex space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit">
                  {['Hepsi', 'TYT', 'AYT'].map((exam) => (
                    <button
                      key={exam}
                      onClick={() => { setSelectedExam(exam); setActiveQuizId(null); }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedExam === exam ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Filter Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search query input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Soru metni veya konu ara..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setActiveQuizId(null); }}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  />
                </div>

                {/* Subject Selector dropdown */}
                <div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => { setSelectedSubject(e.target.value); setActiveQuizId(null); }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-semibold"
                  >
                    {subjectsList.map(subj => (
                      <option key={subj} value={subj}>{subj === 'Hepsi' ? 'Tüm Dersler' : subj}</option>
                    ))}
                  </select>
                </div>

                {/* Action buttons (Sınav Modu or Reset) */}
                <div className="flex gap-2">
                  <button
                    onClick={startExamMode}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center space-x-1"
                  >
                    ⏱️ Mini Deneme Sınavı Başlat
                  </button>
                  <button
                    onClick={() => { setSelectedExam('Hepsi'); setSelectedSubject('Hepsi'); setSearchQuery(''); setActiveQuizId(null); }}
                    className="px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all"
                    title="Filtreleri Sıfırla"
                  >
                    🔄
                  </button>
                </div>
              </div>
            </div>

            {}
            {activeQuizId === 'custom-exam' && (
              <div className="bg-slate-100 dark:bg-slate-850 p-6 rounded-2xl border-2 border-indigo-500/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <div>
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Mini Sınav Modu Aktif</span>
                    <h3 className="text-xl font-bold mt-1 text-slate-800 dark:text-slate-100">Özel Soru Seti ({filteredQuestions.length} Soru)</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-500/10 text-red-600 dark:text-red-400 font-mono font-bold px-4 py-2 rounded-xl border border-red-500/20 flex items-center space-x-2">
                      <span>⏱️ Kalan Süreniz:</span>
                      <span className="text-lg">{formatTime(examTimer)}</span>
                    </div>
                    {!isExamSubmitted ? (
                      <button
                        onClick={submitExam}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-500/20 transition-all"
                      >
                        Sınavı Bitir ve Sonucu Gör
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveQuizId(null)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
                      >
                        Normal Soru Moduna Dön
                      </button>
                    )}
                  </div>
                </div>

                {isExamSubmitted && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                    <div>
                      <h4 className="font-bold">Sınav Değerlendirmeniz Hazır!</h4>
                      <p className="text-xs">Aşağıdaki sorularda doğruları/yanlışları görebilir ve çözümlerine erişebilirsiniz.</p>
                    </div>
                    <div className="text-right font-black">
                      Net: {(
                        filteredQuestions.reduce((acc, q) => {
                          const userAns = selectedAnswers[q.id];
                          if (userAns === q.correctAnswer) return acc + 1;
                          if (userAns && userAns !== q.correctAnswer) return acc - 0.25;
                          return acc;
                        }, 0)
                      ).toFixed(2)} Net
                    </div>
                  </div>
                )}
              </div>
            )}

            {}
            <div className="space-y-6">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                  <span className="text-5xl block">🧐</span>
                  <h3 className="text-lg font-bold">Aradığın kritere uygun soru bulunamadı</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">Sıfırlama butonuna basarak tüm sorulara geri dönebilir ya da ilk soruyu sen ekleyebilirsin!</p>
                  <button 
                    onClick={() => { setSelectedExam('Hepsi'); setSelectedSubject('Hepsi'); setSearchQuery(''); }}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm dark:bg-indigo-950/40 dark:text-indigo-400 transition-all"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const isSaved = savedQuestions.includes(q.id);
                  const userAnswer = selectedAnswers[q.id];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === q.correctAnswer;
                  const showSolution = showSolutionId === q.id || (activeQuizId === 'custom-exam' && isExamSubmitted);

                  return (
                    <div 
                      key={q.id} 
                      className={`bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-300 relative ${
                        hasAnswered && quizMode === 'study'
                          ? isCorrect 
                            ? 'border-emerald-500/30 dark:border-emerald-500/20 shadow-emerald-500/5' 
                            : 'border-rose-500/30 dark:border-rose-500/20 shadow-rose-500/5'
                          : 'border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {/* Badge and bookmark bar */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 pb-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wide ${
                            q.exam === 'TYT' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                          }`}>
                            {q.exam}
                          </span>
                          <span className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                            {q.subject}
                          </span>
                          <span className="text-slate-500 dark:text-slate-500 text-xs font-semibold">
                            {q.topic}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <button 
                            onClick={() => toggleSaveQuestion(q.id)}
                            className={`p-2 rounded-xl transition-all ${isSaved ? 'bg-amber-50 text-amber-500 dark:bg-amber-950/30' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                            title={isSaved ? "Kaydedilenlerden Çıkar" : "Soru Kaydet"}
                          >
                            ⭐
                          </button>
                        </div>
                      </div>

                      {}
                      {/* Question Text */}
                      <div className="space-y-4">
                        <div className="text-slate-800 dark:text-slate-100 font-bold text-sm md:text-base leading-relaxed whitespace-pre-line">
                          <KatexContent text={q.questionText} as="div" />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-2.5 pt-2">
                          {Object.entries(q.options as Record<string, string>).map(([optKey, optText]) => {
                            const isThisOptionSelected = userAnswer === optKey;
                            const isCorrectOpt = q.correctAnswer === optKey;
                            
                            let optBg = 'bg-slate-50 dark:bg-slate-900 border-slate-200/50 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';
                            
                            // Highlight rules depending on Study vs Exam mode state
                            if (quizMode === 'study' && hasAnswered) {
                              if (isCorrectOpt) {
                                optBg = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/40';
                              } else if (isThisOptionSelected && !isCorrect) {
                                optBg = 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/40';
                              }
                            } else if (quizMode === 'exam') {
                              if (isThisOptionSelected) {
                                optBg = 'bg-indigo-600 text-white border-indigo-600';
                              }
                              if (isExamSubmitted) {
                                if (isCorrectOpt) {
                                  optBg = 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/50';
                                } else if (isThisOptionSelected && !isCorrect) {
                                  optBg = 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/50';
                                }
                              }
                            }

                            return (
                              <button
                                key={optKey}
                                onClick={() => handleAnswerSelect(q.id, optKey)}
                                disabled={(quizMode === 'study' && hasAnswered) || (quizMode === 'exam' && isExamSubmitted)}
                                className={`w-full text-left p-3.5 rounded-2xl border text-xs md:text-sm font-semibold transition-all flex items-center space-x-3 ${optBg}`}
                              >
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs border ${
                                  isThisOptionSelected 
                                    ? 'bg-white text-slate-800' 
                                    : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                }`}>
                                  {optKey}
                                </span>
                                <span className="flex-1"><KatexContent text={optText} /></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {}
                      {/* Card Action footer */}
                      <div className="flex flex-wrap items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-6 gap-3">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleLike(q.id)}
                            className="text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors flex items-center space-x-1"
                          >
                            <span>❤️</span> <span>{q.likes} Beğeni</span>
                          </button>
                          <span className="text-xs text-slate-500 font-medium">|</span>
                          <span className="text-xs text-slate-500 font-semibold">Yazarlar: <span className="text-slate-500 font-bold">{q.author}</span></span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Solution toggle button (available in study mode, or always available if exam submitted) */}
                          {(quizMode === 'study' || isExamSubmitted) && (
                            <button
                              onClick={() => setShowSolutionId(showSolutionId === q.id ? null : q.id)}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-1"
                            >
                              <span>📖</span>
                              <span>{showSolution ? 'Çözümü Kapat' : 'Çözümü İncele'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Detailed Solutions Dropdown with AI feature simulator */}
                      {showSolution && (
                        <div className="mt-5 p-5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl space-y-4 animate-slideDown">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-400 flex items-center space-x-1">
                              <span>📚</span> <span>Adım Adım Soru Çözümü:</span>
                            </h4>
                            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded">Detaylı</span>
                          </div>
                          <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                            <KatexContent text={q.solution} as="div" />
                          </div>
                          <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-indigo-100/50 dark:border-indigo-950 flex items-center justify-between gap-4">
                            <span className="text-[11px] text-slate-500">Anlamadığın bir yer mi var?</span>
                            <button 
                              onClick={() => triggerNotification('Yapay Zeka öğretmenimiz detaylı anlatım videosunu hazırlıyor...', 'info')}
                              className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              🤖 Yapay Zeka ile Adımlara Böl
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl font-black">⭐ Kaydedilen Soruların</h2>
              <p className="text-xs text-slate-500">Yapamadığın ya da daha sonra göz atmak istediğin premium YKS soruları.</p>
            </div>

            {savedQuestions.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <span className="text-5xl block">⭐</span>
                <h3 className="text-lg font-bold">Henüz kaydedilmiş soru bulunmuyor</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">Soru havuzundaki her kartın köşesinde yer alan yıldız simgesine tıklayarak buraya soru toplayabilirsin.</p>
                <button 
                  onClick={() => setActiveTab('exams')}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  Soru Havuzunu İncele
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.filter(q => savedQuestions.includes(q.id)).map(q => (
                  <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center space-x-2">
                        <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 text-[10px] font-black px-2.5 py-1 rounded-md">
                          {q.exam}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{q.subject} - {q.topic}</span>
                      </div>
                      <button 
                        onClick={() => toggleSaveQuestion(q.id)}
                        className="text-amber-500 hover:text-slate-500 p-2 text-sm transition-all"
                      >
                        ★ Kaydedildi
                      </button>
                    </div>
                    <div className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                      <KatexContent text={q.questionText} as="div" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                      <span className="text-xs text-slate-500">Yazar: {q.author}</span>
                      <button
                        onClick={() => { setActiveTab('exams'); setSelectedSubject(q.subject); setSearchQuery(q.topic); }}
                        className="text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:underline"
                      >
                        Soru Akışında Git &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'add-question' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl font-black">➕ Havuza Soru Katkısı Sağla</h2>
              <p className="text-xs text-slate-500">Yazdığın veya elinde çözümü bulunan özgün YKS sorularını yükleyerek topluluk havuzuna katkıda bulunabilirsin.</p>
            </div>

            <form onSubmit={handleCreateQuestion} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Sınav Kategorisi</label>
                  <select
                    value={newQuestion.exam}
                    onChange={(e) => setNewQuestion({ ...newQuestion, exam: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                  >
                    <option value="TYT">TYT (Temel Yeterlilik)</option>
                    <option value="AYT">AYT (Alan Yeterlilik)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Ders Seçimi</label>
                  <select
                    value={newQuestion.subject}
                    onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                  >
                    {subjectsList.filter(s => s !== 'Hepsi').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Konu Başlığı</label>
                  <input
                    type="text"
                    placeholder="Örn: Limit ve Süreklilik"
                    value={newQuestion.topic}
                    onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Zorluk Derecesi</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                  >
                    <option value="Kolay">Kolay</option>
                    <option value="Orta">Orta</option>
                    <option value="Zor">Zor</option>
                  </select>
                </div>
              </div>

              {}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Soru Metni</label>
                <textarea
                  rows={4}
                  placeholder="Sorunun tüm detaylarını, gerekli ise tüm şartları buraya ekleyin..."
                  value={newQuestion.questionText}
                  onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                ></textarea>
              </div>

              {/* Options fields */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Şıklar ve Cevap Seçenekleri</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['A', 'B', 'C', 'D', 'E'].map(opt => (
                    <div key={opt} className="flex items-center space-x-2">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 font-bold flex items-center justify-center border text-xs">{opt}</span>
                      <input
                        type="text"
                        placeholder={`Şık metni...`}
                        value={newQuestion[opt]}
                        onChange={(e) => setNewQuestion({ ...newQuestion, [opt]: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-xs"
                        required={opt === 'A' || opt === 'B'}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct answer & Solution explanation fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Doğru Cevap Şıkkı</label>
                  <select
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                  >
                    {['A', 'B', 'C', 'D', 'E'].map(opt => (
                      <option key={opt} value={opt}>{opt} Şıkkı</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Adınız / Mahlasınız</label>
                  <input
                    type="text"
                    placeholder="Örn: Ahmet Hoca"
                    value={newQuestion.author}
                    onChange={(e) => setNewQuestion({ ...newQuestion, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Detaylı Çözüm Açıklaması</label>
                <textarea
                  rows={3}
                  placeholder="Kullanıcıların soruyu yanlış yaptıklarında görecekleri çözümü adım adım yazın..."
                  value={newQuestion.solution}
                  onChange={(e) => setNewQuestion({ ...newQuestion, solution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                ></textarea>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:from-indigo-700 hover:to-pink-600 transition-all text-sm uppercase tracking-wider"
                >
                  🚀 Soruyu Havuzda Yayınla
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {}
      {/* Footer Section */}
      <footer className={`border-t mt-20 py-10 transition-colors ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center space-x-2 items-center">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-black text-sm">🎴</span>
            <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">tytaytsorulari</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Türkiye'nin en yenilikçi ve akıllı YKS (TYT-AYT) soru bankası portalı. ÖSYM formatına %100 uyumlu, öğrenci dostu arayüz.
          </p>
          <div className="flex justify-center space-x-4 text-xs font-bold text-slate-500 pt-2">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-indigo-600">Panel</button>
            <span>•</span>
            <button onClick={() => setActiveTab('exams')} className="hover:text-indigo-600">Soru Çöz</button>
            <span>•</span>
            <button onClick={() => setActiveTab('add-question')} className="hover:text-indigo-600">Soru Katkısı</button>
          </div>
          <div className="text-[10px] text-slate-500 pt-4">
            &copy; {new Date().getFullYear()} tytaytsorulari. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}