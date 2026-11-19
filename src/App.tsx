import { Navigate, Route, Routes } from "react-router-dom";
import Animals from "./pages/Animals";
import Basics, { BasicsList } from "./pages/Basics";
import ContentView from "./pages/ContentView";
import Dictionary, { Colours, Planets } from "./pages/Dictionary";
import History, { HistoryView, Intanga, Kings, NameList } from "./pages/History";
import Home from "./pages/Home";
import ImageView from "./pages/ImageView";
import Landing from "./pages/Landing";
import Surnames, { SubSurnames } from "./pages/Surnames";
import SurnameDetail from "./pages/SurnameDetail";
import Wisdom from "./pages/Wisdom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wisdom" element={<Wisdom />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/content/:base/:category" element={<ContentView />} />
      <Route path="/image" element={<ImageView />} />
      <Route path="/surnames" element={<Surnames />} />
      <Route path="/surnames/:clan" element={<SubSurnames />} />
      <Route path="/surname" element={<SurnameDetail />} />
      <Route path="/dictionary" element={<Dictionary />} />
      <Route path="/dictionary/planets" element={<Planets />} />
      <Route path="/dictionary/colours" element={<Colours />} />
      <Route path="/basics" element={<Basics />} />
      <Route path="/basics/:id" element={<BasicsList />} />
      <Route path="/history" element={<History />} />
      <Route path="/history/view/:title/:sub" element={<HistoryView />} />
      <Route path="/history/kings" element={<Kings />} />
      <Route path="/history/intanga" element={<Intanga />} />
      <Route path="/history/names/:id" element={<NameList />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
